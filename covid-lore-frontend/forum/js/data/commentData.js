import {AJAX_JSON, AJAX_JSON_HEADER, AJAX_PLAIN, AJAX_PLAIN_HEADER, dataToYMNFormat, getAuthOption} from "../helper";
import {API_GATEWAY} from "../config";
import {Buffer} from "buffer";
import {get} from "leaflet/src/dom/DomUtil";

class CommentData {

    // keep track of already loaded sub replies on the current discussion
    _loadedSubReplies = [];

    constructor() {
        this._jwtToken = localStorage.getItem("accessToken");
        this._parsedToken = JSON.parse(Buffer.from(this._jwtToken.split('.')[1], 'base64').toString());

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this._questionId = urlParams.get('p');
    }

    _getAuthHeader() {
        return { "headers": {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                'Content-Type': 'application/json'
            }}
    }

    loadQuestionData() {
        return AJAX_JSON_HEADER(`${API_GATEWAY}/posts/${this._questionId}`, getAuthOption());
    }

    /* The ‘level’ parameter determines the number of comments to load
    (we do not want to load immediately all comments of the thread, as it would violate performance.
    Hence, we load only if the Show Replies button was pressed or when the page is opened)
    */
    loadCommentData(level) {
        level = String(level).includes('question') ? 0 : level;
        return AJAX_JSON_HEADER(`${API_GATEWAY}/comment/${this._questionId}${level ? `/${level}` : ''}`, getAuthOption());
    }

    hasLoadedSubReply(id) {
        return this._loadedSubReplies.indexOf(id) !== -1;
    }

    addLoadedSubReplies(id) {
        this._loadedSubReplies.push(id);
    }

    assembleCommentData(parentCommentId, replyText) {

        const parsedToken = JSON.parse(Buffer.from(this._jwtToken.split('.')[1], 'base64').toString());
        const { preferred_username: username } = parsedToken;
        const currentTime = new Date();
        return {
            parentCommentId: String(parentCommentId).includes('question') ? null : parentCommentId,
            commentId: username + currentTime.getTime(),
            description: replyText,
            postId: new URLSearchParams(window.location.search).get('p'),
            commentDate: dataToYMNFormat(currentTime),
            numOfChildren: 0,
            sumDisLike: 0,
            sumLike: 0,
        }
    }

    sendPostCommentRequest(commentData) {
        const url = `${API_GATEWAY}/comment`;
        const {commentDate, numOfChildren, sumDisLike, sumLike , ...restData} = commentData;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(restData),
            headers: getAuthOption().headers,
        }).then();
    }

    sendPostScoreRequest(commentId, score, isComment) {
        const url = `${API_GATEWAY}/comment/change${isComment ? 'Comment' : 'Post'}Score`;
        const scoreObj = {
            score: score === 'like' ? 1 : -1,
            scoreId: {}
        }
        isComment ? scoreObj.scoreId.commentId = commentId : scoreObj.scoreId.postId = commentId;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(scoreObj),
            headers: getAuthOption().headers,
        }).then();
    }
}

export default CommentData;
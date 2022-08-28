import {AJAX_JSON, AJAX_JSON_HEADER, AJAX_PLAIN, AJAX_PLAIN_HEADER, dataToNormalFormat} from "../helper";
import {API_GATEWAY} from "../config";

class DiscussionData {

    // last primary key of the comment is required to keep synchronous backend and frontend parentId
    // TODO: Probably, this dependency between 'f' and 'b' is bad; hence reengineer it.
    lastPrimaryKey = 0;

    // keep track of already loaded sub replies on the current discussion
    _loadedSubReplies = [];

    async setInitialData() {
        this.lastPrimaryKey = await AJAX_PLAIN_HEADER(`${API_GATEWAY}/comment/lastCommentId`, { "headers": {
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        }});
        this.lastPrimaryKey++;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.questionId = urlParams.get('p');
    }

    nextPrimaryKey() {
        this.lastPrimaryKey++;
    }

    loadQuestionData() {
        return AJAX_JSON_HEADER(`${API_GATEWAY}/posts/${this.questionId}`, { "headers":{
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
                'Content-Type': 'application/json'
        }});
    }

    /* The ‘level’ parameter determines the number of comments to load
    (we do not want to load immediately all comments of the thread, as it would violate performance.
    Hence, we load only if the Show Replies button was pressed or when the page is opened)
    */
    loadCommentData(level) {
        level = String(level).includes('question') ? 0 : level;
        return AJAX_JSON_HEADER(`${API_GATEWAY}/comment/${this.questionId}${level ? `/${level}` : ''}`, { "headers":{
            "Authorization": "Bearer " + localStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        }});
    }

    hasLoadedSubReply(id) {
        return this._loadedSubReplies.indexOf(id) !== -1;
    }

    addLoadedSubReplies(id) {
        this._loadedSubReplies.push(id);
    }

    assembleCommentData(parentCommentId, replyText) {
        return {
            parentCommentId: String(parentCommentId).includes('question') ? null : parentCommentId,
            commentDate: dataToNormalFormat(new Date()),
            commentId: this.lastPrimaryKey,
            description: replyText,
            numOfChildren: 0,
            postId: new URLSearchParams(window.location.search).get('p'),
            sumDisLike: 0,
            sumLike: 0,
        }
    }

    sendCreateCommentRequest(commentData) {
        const url = `${API_GATEWAY}/comment/createComment`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
        }).then();
    }

    sendChangeScoreRequest(commentId, score, isComment) {
        const url = `${API_GATEWAY}/comment/change${isComment ? 'Comment' : 'Post'}Score`;
        const scoreObj = {
            score: score === 'like' ? 1 : -1,
            scoreId: {

            }
        }
        isComment ? scoreObj.scoreId.commentId = commentId : scoreObj.scoreId.postId = commentId;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(scoreObj),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
        }).then();
    }
}

export default new DiscussionData();
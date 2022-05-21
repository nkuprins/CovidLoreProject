import {AJAX_JSON, AJAX_PLAIN, dataToNormalFormat} from "../helper";

export default class DiscussionData {

    static _lastPrimaryKey = 0;
    static _user;
    _loadedSubReplies = [];
    _csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

    loadQuestionData() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const questionId = urlParams.get('p');
        return AJAX_JSON(`http://localhost:8080/api/discussion/post/${questionId}`);
    }

    loadCommentData(level) {
        level = String(level).includes('question') ? 0 : level;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const postId = urlParams.get('p');
        return AJAX_JSON(`http://localhost:8080/api/discussion/comment/${postId}${level ? `/${level}` : ''}`);
    }

    hasLoadedSubReplies(id) {
        return this._loadedSubReplies.indexOf(id) !== -1;
    }

    addLoadedSubReplies(id) {
        this._loadedSubReplies.push(id);
    }

    assembleCommentData(parentCommentId, replyText) {
        return {
            parentCommentId: String(parentCommentId).includes('question') ? null : parentCommentId,
            commentDate: dataToNormalFormat(new Date()),
            commentId: DiscussionData.getLastPrimary(),
            description: replyText,
            numOfChildren: 0,
            postId: new URLSearchParams(window.location.search).get('p'),
            sumDisLike: 0,
            sumLike: 0,
            user: DiscussionData._user
        }
    }

    sendCreateCommentRequest(commentData) {
        const url = 'http://localhost:8080/api/discussion/createComment';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': this._csrfToken },
        }).then();
    }

    sendChangeScoreRequest(commentId, score, isComment) {
        const url = `http://localhost:8080/api/discussion/change${isComment ? 'Comment' : 'Post'}Score`;
        const scoreObj = {
            scoreId: { userId: DiscussionData._user.userId},
            score: score === 'like' ? 1 : -1
        }
        isComment ? scoreObj.scoreId.commentId = commentId : scoreObj.scoreId.postId = commentId;

        console.log(scoreObj);

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(scoreObj),
            headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': this._csrfToken },
        }).then();
    }

    async setInitialData() {
        DiscussionData._user = await AJAX_JSON(`http://localhost:8080/api/discussion/loggedInUser`);
        DiscussionData._lastPrimaryKey = await AJAX_PLAIN(`http://localhost:8080/api/discussion/lastCommentId`);
    }

    static getLastPrimary() {
        return DiscussionData._lastPrimaryKey;
    }

    static nextPrimaryKey() {
        this._lastPrimaryKey++;
    }

    static getLoggedInUsername() {
        return DiscussionData._user.username;
    }

}
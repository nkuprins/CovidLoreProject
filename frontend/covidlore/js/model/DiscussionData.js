import {AJAX_JSON, AJAX_PLAIN, dataToNormalFormat} from "../helper";

export default class DiscussionData {

    static _lastPrimaryKey = 0;
    _loadedSubReplies = [];
    _username;
    _csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

    loadPostData() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const postId = urlParams.get('p');
        return AJAX_JSON(`http://localhost:8080/api/discussion/post/${postId}`);
    }

    loadCommentData(level) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const postId = urlParams.get('p');
        return AJAX_JSON(`http://localhost:8080/api/discussion/comment/${postId}${level ? `/${level}` : ''}`);
    }

    hasLoadedSubReplies(id) {
        return this._loadedSubReplies.indexOf(Number(id)) !== -1;
    }

    addLoadedSubReplies(id) {
        this._loadedSubReplies.push(Number(id));
    }

    assembleCommentData(parentCommentId, replyText) {
        return {
            parentCommentId: Number(parentCommentId) === 0 ? null : parentCommentId,
            commentDate: dataToNormalFormat(new Date()),
            commentId: DiscussionData.getLastPrimary(),
            description: replyText,
            numOfChildren: 0,
            postId: new URLSearchParams(window.location.search).get('p'),
            sumDisLike: 0,
            sumLike: 0,
            user: { username: this._username }
        }
    }

    sendCreateRequest(commentData) {
        const url = 'http://localhost:8080/api/discussion/createComment';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': this._csrfToken },
        }).then();
    }

    async setInitialData() {
        this._username = await AJAX_PLAIN(`http://localhost:8080/api/discussion/loggedInUser`);
        DiscussionData._lastPrimaryKey = await AJAX_PLAIN(`http://localhost:8080/api/discussion/lastCommentId`);
    }

    static getLastPrimary() {
        return DiscussionData._lastPrimaryKey;
    }

    static nextPrimaryKey() {
        this._lastPrimaryKey++;
        console.log(this._lastPrimaryKey)
    }

}
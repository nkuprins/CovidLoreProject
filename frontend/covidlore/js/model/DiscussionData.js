import {AJAX, dataToNormalFormat} from "../helper";

export default class DiscussionData {

    _loadedSubReplies = [];
    static _lastId = 0;

    loadPostData() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const postId = urlParams.get('p');
        return AJAX(`http://localhost:8080/api/discussion/post/${postId}`);
    }

    loadCommentData(level) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const postId = urlParams.get('p');
        return AJAX(`http://localhost:8080/api/discussion/comment/${postId}${level ? `/${level}` : ''}`);
    }

    hasLoadedSubReplies(id) {
        return this._loadedSubReplies.indexOf(id) !== -1;
    }

    addLoadedSubReplies(id) {
        return this._loadedSubReplies.push(id);
    }

    assembleCommentData(parentDiscussionId, replyText) {
        return {
            commentDate: dataToNormalFormat(new Date()),
            commentId: 0,
            description: replyText,
            numOfChildren: 0,
            parentCommentId: parentDiscussionId.slice(-1),
            postId: new URLSearchParams(window.location.search).get('p'),
            sumDisLike: 0,
            sumLike: 0,
            user: {userId: 2, username: 'Anish' }
        }
    }

    sendCreateRequest(commentData) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:8080/api/discussion/createComment', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(commentData));
    }

    static getLastId() {
        return this._lastId;
    }

    static setNextId(newLastId) {
        this._lastId = newLastId;
    }

    static updateToNextId() {
        this._lastId++;
    }

}
import {AJAX, dataToNormalFormat} from "../helper";

export default class DiscussionData {

    _loadedSubReplies = [];
    static _lastPrimaryKey = 0;

    constructor() {

    }

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
        console.log(this._loadedSubReplies);
        console.log(id);
        console.log(this._loadedSubReplies.indexOf(Number(id)) !== -1);
        return this._loadedSubReplies.indexOf(Number(id)) !== -1;
    }

    addLoadedSubReplies(id) {
        this._loadedSubReplies.push(Number(id));
    }

    assembleCommentData(parentCommentId, replyText) {
        console.log("LAAAAST");
        console.log(parentCommentId);
        return {
            parentCommentId: Number(parentCommentId) === 0 ? null : parentCommentId,
            commentDate: dataToNormalFormat(new Date()),
            commentId: DiscussionData.getLastPrimary(),
            description: replyText,
            numOfChildren: 0,
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

    async setInitialId() {
        DiscussionData._lastPrimaryKey = await AJAX(`http://localhost:8080/api/discussion/lastCommentId`);
    }

    static getLastPrimary() {
        return this._lastPrimaryKey;
    }

    static nextPrimaryKey() {
        this._lastPrimaryKey++;
    }

}
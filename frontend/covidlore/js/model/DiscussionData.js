import {AJAX} from "../helper";

export default class DiscussionData {

    static _lastId = 0;
    static _hasLoaded = false;

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

    static getLastId() {
        return this._lastId;
    }

    static getHasLoaded() {
        return this._hasLoaded;
    }

    static setNextId(newLastId) {
        this._lastId = newLastId;
    }

    static updateToNextId() {
        this._lastId++;
        this._hasLoaded = true;
    }

}
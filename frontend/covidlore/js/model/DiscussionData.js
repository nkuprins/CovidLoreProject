
export default class DiscussionData {

    static _lastId = 0;
    static _hasLoaded = false;

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
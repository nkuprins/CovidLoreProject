import {AJAX_JSON, AJAX_PLAIN, dataToNormalFormat} from "../helper";

class DiscussionData {

    // last primary key of the comment is required to keep synchronous backend and frontend parentId
    // TODO: Probably, this dependency between 'f' and 'b' is bad; hence reengineer it.
    lastPrimaryKey = 0;

    // keep track of already loaded sub replies on the current discussion
    _loadedSubReplies = [];

    async setInitialData() {
        this.lastPrimaryKey = await AJAX_PLAIN(`http://localhost:8080/api/discussion/lastCommentId`);
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.questionId = urlParams.get('p');
    }

    nextPrimaryKey() {
        this.lastPrimaryKey++;
    }

    loadQuestionData() {
        return AJAX_JSON(`http://localhost:8080/api/discussion/post/${this.questionId}`);
    }

    /* The ‘level’ parameter determines the number of comments to load
    (we do not want to load immediately all comments of the thread, as it would violate performance.
    Hence, we load only if the Show Replies button was pressed or when the page is opened)
    */
    loadCommentData(level) {
        level = String(level).includes('question') ? 0 : level;
        return AJAX_JSON(`http://localhost:8080/api/discussion/comment/${this.questionId}${level ? `/${level}` : ''}`);
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
            user: DiscussionData._user
        }
    }

    sendCreateCommentRequest(commentData) {
        const url = 'http://localhost:8080/api/discussion/createComment';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: { 'Content-Type': 'application/json'},
        }).then();
    }

    sendChangeScoreRequest(commentId, score, isComment) {
        const url = `http://localhost:8080/api/discussion/change${isComment ? 'Comment' : 'Post'}Score`;
        const scoreObj = {
            scoreId: { userId: DiscussionData._user.userId},
            score: score === 'like' ? 1 : -1
        }
        isComment ? scoreObj.scoreId.commentId = commentId : scoreObj.scoreId.postId = commentId;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(scoreObj),
            headers: { 'Content-Type': 'application/json'},
        }).then();
    }
}

export default new DiscussionData();
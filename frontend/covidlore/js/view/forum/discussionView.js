import CommentRow from "./commentRow";
import DiscussionData from "../../model/DiscussionData";
import QuestionRow from "./questionRow";

class DiscussionView {

    static _loadedSubReplies = [];
    static _discussionData = new DiscussionData();

    constructor() {

    }

    showQuestion(questionData) {
        console.log("Question:");
        console.log(questionData);
        const parentNode = document.querySelector('main');
        const questionRow = new QuestionRow(parentNode, questionData);
        questionRow.createQuestionArticle();
        questionRow.addReplyListener();
        questionRow.addScoreListener();
    }

    static showComments(parentId) {

        if (this._loadedSubReplies.indexOf(parentId) !== -1)
            return;

        this._discussionData.loadCommentData(parentId).then(commentData => {
            Object.entries(commentData).forEach((entries) => {
                const [id, data] = entries;
                console.log("Comment:");
                console.log(commentData);

                DiscussionData.setNextId(id);
                const parentNode = document.querySelector(`#post-${data.parentCommentId == null ? 0 : data.parentCommentId}`);
                console.log(parentNode);
                console.log("BEFORE parent node");
                const commentRow = new CommentRow(parentNode, data);
                commentRow.createArticle();
                commentRow.addReplyListener();
                commentRow.addRepliesListenerForLoadedData();
                commentRow.addScoreListener();
            });
        })

        this._loadedSubReplies.push(parentId);
    }
}

export default DiscussionView;
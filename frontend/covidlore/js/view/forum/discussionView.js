import CommentRow from "./commentRow";
import QuestionRow from "./questionRow";
import DiscussionData from "../../model/DiscussionData";

class DiscussionView {

    constructor() {

    }

    showQuestion(questionData) {
        questionData.commentId = 0;
        const parentNode = document.querySelector('main');
        const questionRow = new QuestionRow(parentNode, questionData);
        questionRow.createQuestionArticle();
        questionRow.addReplyListener();
        questionRow.addScoreListener();
    }

    showComments(parentNode, commentData) {

        const commentRow = new CommentRow(parentNode, commentData, false);
        commentRow.createArticle();
        commentRow.addReplyListener();
        commentRow.addRepliesListenerForLoadedData();
        commentRow.addScoreListener();
    }
}

export default DiscussionView;
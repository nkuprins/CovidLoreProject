import CommentRow from "./commentRow";
import DiscussionData from "../../model/DiscussionData";
import QuestionRow from "./questionRow";

class DiscussionView {

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

    showComments(parentNode, commentData) {

            const commentRow = new CommentRow(parentNode, commentData);
            commentRow.createArticle();
            commentRow.addReplyListener();
            commentRow.addRepliesListenerForLoadedData();
            commentRow.addScoreListener();
    }
}

export default DiscussionView;
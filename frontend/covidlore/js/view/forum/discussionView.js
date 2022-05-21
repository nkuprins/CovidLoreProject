import CommentRow from "./commentRow";
import QuestionRow from "./questionRow";

class DiscussionView {

    showQuestion(questionData) {
        questionData.commentId = `question-${questionData.postId}`;
        const parentNode = document.querySelector('main');
        const questionRow = new QuestionRow(parentNode, questionData);
        questionRow.createQuestionArticle();
        questionRow.addReplyListener();
        questionRow.addQuestionScoreListener();
    }

    showComments(parentNode, commentData) {

        const commentRow = new CommentRow(parentNode, commentData, false);
        commentRow.createArticle();
        commentRow.addReplyListener();
        commentRow.addRepliesListenerForLoadedData();
        commentRow.addCommentsScoreListener();
    }
}

export default DiscussionView;
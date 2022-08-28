import NavView from "../view/navView";
import discussionData from "../data/discussionData";
import QuestionRow from "../view/forum/questionRow";
import CommentRow from "../view/forum/commentRow";

const init = function () {

    new NavView(2).addHandlerNavHover();

    discussionData.setInitialData().then(() =>
        discussionData.loadQuestionData().then(questionData => {
            questionData.commentId = `question-${questionData.postId}`;
            const parentNode = document.querySelector('main');
            const questionRow = new QuestionRow(parentNode, questionData);
            questionRow.createQuestionArticle();
            questionRow.addReplyListener();
            questionRow.addQuestionScoreListener(processChangePostScoreRequest);

            loadCommentsData(`question-${data.postId}`).then();
        })
    )
}

// If the discussion data was already fetched for the current replies,
// then return false, otherwise add parentId to loadedSubReplies and
// load and show these replies.
const loadCommentsData = async function (parentId) {

    if (discussionData.hasLoadedSubReply(parentId))
        return false;
    discussionData.addLoadedSubReplies(parentId);

    await discussionData.loadCommentData(parentId).then(comments => {
        Object.entries(comments).forEach((entries) => {
            const [_, commentData] = entries;
            const parentNode = document.querySelector(`#comment-post-${parentId}`);

            const commentRow = new CommentRow(parentNode, commentData, false, loadCommentsData, saveCommentsData);
            commentRow.showPost();
            commentRow.addReplyListener();
            commentRow.addRepliesListenerForLoadedData();
            commentRow.addCommentsScoreListener(processChangeCommentScoreRequest);
        });
    })

    return true;
}

// Assemble comment data and sends Rest POST call
// return assembled comment data
const saveCommentsData = function (parentCommentId, replyText) {

    const commentData = discussionData.assembleCommentData(parentCommentId, replyText);
    discussionData.sendCreateCommentRequest(commentData)
    discussionData.nextPrimaryKey();
    return commentData;
}

// Process commentId and send Rest POST call to insert score of the comment
const processChangeCommentScoreRequest = function (commentId, score) {
    discussionData.sendChangeScoreRequest(commentId.slice(13), score, true);
}

// Process postId and send Rest POST call to insert score of the question
const processChangePostScoreRequest = function (postId, score) {
    discussionData.sendChangeScoreRequest(postId.slice(22), score, false);
}

init();
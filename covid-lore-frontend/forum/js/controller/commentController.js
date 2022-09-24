import NavView from "../view/navView";
import CommentQuestionRow from "../view/forum/commentQuestionRow";
import CommentRow from "../view/forum/commentRow";
import secureLogin from "../logginController";
import CommentData from "../data/commentData";

let commentData;

const init = async function () {

    await secureLogin.initKeyCloak();
    commentData = new CommentData();
    new NavView(2).addHandlerNavHover();

    commentData.loadQuestionData().then(data => {
        data.commentId = `question-${data.postId}`;
        const parentNode = document.querySelector('main');

        const questionRow = new CommentQuestionRow(parentNode, data, loadCommentsData, saveCommentsData);
        questionRow.showQuestionArticle();
        questionRow.addReplyListener();
        questionRow.addQuestionScoreListener(processChangePostScoreRequest);

        loadCommentsData(data.commentId).then();
    })

}

// Loads sub-comments of a specific parent comment if needed.
// If the sub-comments were already loaded from DB for the current comment, return false
// otherwise add parentId to loadedSubReplies and load and show these replies.
const loadCommentsData = async function (parentId) {

    if (commentData.hasLoadedSubReply(parentId))
        return false;
    commentData.addLoadedSubReplies(parentId);

    await commentData.loadCommentData(parentId).then(comments => {
        Object.entries(comments).forEach((entries) => {
            const [_, commentData] = entries;
            const parentNode = document.querySelector(`#${parentId}`);
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

    const data = commentData.assembleCommentData(parentCommentId, replyText);
    commentData.sendPostCommentRequest(data)
    return data;
}

// Process commentId and send Rest POST call to insert score of the comment
const processChangeCommentScoreRequest = function (commentId, score) {
    commentData.sendPostScoreRequest(commentId.slice(13), score, true);
}

// Process postId and send Rest POST call to insert score of the question
const processChangePostScoreRequest = function (postId, score) {
    commentData.sendPostScoreRequest(postId.slice(22), score, false);
}

init();
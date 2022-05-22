import NavView from "../view/navView";
import DiscussionView from "../view/forum/discussionView.js"
import DiscussionData from "../model/discussionData";

const discussionData = new DiscussionData();
const discussionView = new DiscussionView();

const init = function () {

    new NavView(2).addHandlerNavHover();

    discussionData.setInitialData().then(() => // set primaryKet and loggeIn user
        discussionData.loadQuestionData().then(data => { // load post question
            discussionView.showQuestion(data)
            processCommentsDataLoad(`question-${data.postId}`).then();
        }))
}

// If the discussion data was already fetched for the current replies,
// then return false, otherwise add parentId to loadedSubReplies and
// load and show these replies.
export const processCommentsDataLoad = async function (parentId) {

    if (discussionData.hasLoadedSubReplies(parentId))
        return false;

    discussionData.addLoadedSubReplies(parentId);

    // load replies
    await discussionData.loadCommentData(parentId).then(comments => {
        Object.entries(comments).forEach((entries) => {
            const [_, commentData] = entries;
            const parentNode = document.querySelector(`#comment-post-${parentId}`);
            discussionView.showComments(parentNode, commentData);
        });
    })

    return true;
}

// Assemble comment data and sends Rest POST call
// return assembled comment data
export const processCommentsDataCreate = function (parentCommentId, replyText) {

    const commentData = discussionData.assembleCommentData(parentCommentId, replyText);
    discussionData.sendCreateCommentRequest(commentData)
    return commentData;
}

// Process commentId and send Rest POST call to insert score of the comment
export const processChangeCommentScoreRequest = function (commentId, score) {
    discussionData.sendChangeScoreRequest(commentId.slice(13), score, true);
}

// Process postId and send Rest POST call to insert score of the question
export const processChangePostScoreRequest = function (postId, score) {
    discussionData.sendChangeScoreRequest(postId.slice(22), score, false);
}

init();
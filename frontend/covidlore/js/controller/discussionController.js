import NavView from "../view/navView";
import DiscussionView from "../view/forum/discussionView.js"
import DiscussionData from "../model/DiscussionData";

const discussionData = new DiscussionData();
const discussionView = new DiscussionView();

const init = function () {

    new NavView(2).addHandlerNavHover();

    discussionData.setInitialData().then(() =>
        discussionData.loadQuestionData().then(data => {
            discussionView.showQuestion(data)
            processCommentsDataLoad(`question-${data.postId}`).then();
        }))
}

export const processCommentsDataLoad = async function (parentId) {

    if (discussionData.hasLoadedSubReplies(parentId))
        return false;

    discussionData.addLoadedSubReplies(parentId);
    await discussionData.loadCommentData(parentId).then(comments => {
        Object.entries(comments).forEach((entries) => {
            const [id, commentData] = entries;
            const parentNode = document.querySelector(`#comment-post-${parentId}`);
            discussionView.showComments(parentNode, commentData);
        });
    })

    return true;
}

export const processCommentsDataCreate = function (parentCommentId, replyText) {

    const commentData = discussionData.assembleCommentData(parentCommentId, replyText);
    discussionData.sendCreateCommentRequest(commentData)
    return commentData;
}

export const processChangeCommentScoreRequest = function (commentId, score) {
    discussionData.sendChangeScoreRequest(commentId.slice(13), score, true);
}

export const processChangePostScoreRequest = function (postId, score) {
    discussionData.sendChangeScoreRequest(postId.slice(22), score, false);
}

init();
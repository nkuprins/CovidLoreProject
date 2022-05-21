import NavView from "../view/navView";
import DiscussionView from "../view/forum/discussionView.js"
import DiscussionData from "../model/DiscussionData";

const discussionData = new DiscussionData();
const discussionView = new DiscussionView();

const init = function () {

    new NavView(2).addHandlerNavHover();

    discussionData.setInitialData().then(() =>
        discussionData.loadPostData().then(data => {
            discussionView.showQuestion(data)
            processCommentsDataLoad(0).then();
        }))
}

export const processCommentsDataLoad = async function (parentId) {

    if (discussionData.hasLoadedSubReplies(parentId))
        return false;

    console.log("LOAD NEW DATA");
    discussionData.addLoadedSubReplies(parentId);
    await discussionData.loadCommentData(parentId).then(comments => {
        Object.entries(comments).forEach((entries) => {
            const [id, commentData] = entries;
            console.log("we await" + commentData);
            const parentNode = document.querySelector(`#post-${parentId}`);
            discussionView.showComments(parentNode, commentData);
        });
    })

    return true;
}

export const processCommentsDataCreate = function (parentCommentId, replyText) {

    const commentData = discussionData.assembleCommentData(parentCommentId, replyText);
    discussionData.sendCreateRequest(commentData)
    return commentData;
}

init();
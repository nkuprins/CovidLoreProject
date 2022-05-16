import NavView from "../view/navView";
import DiscussionView from "../view/forum/discussionView.js"
import DiscussionData from "../model/DiscussionData";
import CommentRow from "../view/forum/commentRow";

const discussionData = new DiscussionData();
const discussionView = new DiscussionView();

const init = function () {

    new NavView(2).addHandlerNavHover();

    discussionData.loadPostData().then(data => {
        discussionView.showQuestion(data)
        processCommentsDataLoad(0).then();
    });
}

export const processCommentsDataLoad = async function (parentId) {

    if (discussionData.hasLoadedSubReplies(parentId))
        return false;

    console.log("NEW PAREN ID");
    console.log(parentId);

    await discussionData.loadCommentData(parentId).then(comments => {
        Object.entries(comments).forEach((entries) => {

            const [id, commentData] = entries;
            DiscussionData.setNextId(id);
            const parentNode = document.querySelector(`#post-${parentId}`);
            discussionData.addLoadedSubReplies(parentId);
            discussionView.showComments(parentNode, commentData);

            console.log("Comment:");
            console.log(comments);


            console.log(parentNode);
            console.log("BEFORE parent node");
        });
    })

    return true;
}

export const processCommentsDataCreate = function (parentId, replyText) {

    const commentData = discussionData.assembleCommentData(parentId, replyText);
    discussionData.sendCreateRequest(commentData)
    return commentData;
}

init();
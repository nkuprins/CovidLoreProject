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
        processCommentsData(0).then();
    });
}

export const processCommentsData = async function (parentId) {

    if (discussionData.hasLoadedSubReplies(parentId))
        return;

    console.log(parentId);
    await discussionData.loadCommentData(parentId).then(comments => {
        Object.entries(comments).forEach((entries) => {

            const [id, commentData] = entries;
            DiscussionData.setNextId(id);
            const parentNode = document.querySelector(`#post-${parentId}`);
            discussionView.showComments(parentNode, commentData);
            discussionData.addLoadedSubReplies(parentId);
            console.log("Comment:");
            console.log(comments);


            console.log(parentNode);
            console.log("BEFORE parent node");
        });
    })
}

init();
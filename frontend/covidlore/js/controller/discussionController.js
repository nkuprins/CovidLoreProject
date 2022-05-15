import NavView from "../view/navView";
import DiscussionView from "../view/forum/discussionView.js"
import DiscussionData from "../model/DiscussionData";

const init = function () {

    new NavView(2).addHandlerNavHover();
    const discussionData = new DiscussionData();
    const discussionView = new DiscussionView();

    discussionData.loadPostData().then(data => discussionView.showQuestion(data));
    discussionData.loadCommentData().then(data => DiscussionView.showComments());
}

init();
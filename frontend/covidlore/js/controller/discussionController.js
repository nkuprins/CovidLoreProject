import NavView from "../view/navView";
import DiscussionView from "../view/forum/discussionView.js"

const init = function () {

    new NavView(2).addHandlerNavHover();
    const discussionView = new DiscussionView();
}

init();
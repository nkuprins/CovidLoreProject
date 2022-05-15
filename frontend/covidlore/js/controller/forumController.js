import NavView from "../view/navView";
import forumView from "../view/forum/forumView";

const init = function () {

    new NavView(2).addHandlerNavHover();
    forumView.addSortButtonsListener();
    forumView.addNewThreadListener();
}

init();
import NavView from "../view/navView";
import forumView from "../view/forum/forumView";

const init = function () {

    new NavView(2).addHandlerNavHover();
    document.querySelectorAll('.thread__body').forEach(tr => tr.addEventListener('click', () => window.location='./discussion.html'))
    forumView.addSortButtonsListener();
    forumView.addNewThreadListener();
}

init();
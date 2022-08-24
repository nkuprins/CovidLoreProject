import NavView from "../view/navView";
import forumView from "../view/forumView";
import secureLogin from "../logginController";
import forumData from "../data/forumData"


const init = function () {

    secureLogin.initKeyCloak();

    new NavView(2).addHandlerNavHover();
    forumView.addSortButtonsListener();
    forumView.addNewThreadListener();

    const data = forumData.fetchForumData().then(data =>
        forumView.showForumTopicView(data)
    );

}

init();
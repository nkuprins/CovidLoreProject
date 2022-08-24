import NavView from "../view/navView";
import forumView from "../view/forumView";
import secureLogin from "../logginController";
import forumData from "../data/forumData"
import logginController from "../logginController";


const init = function () {

    // if (!logginController.isLogged())
        secureLogin.initKeyCloak();

    new NavView(2).addHandlerNavHover();
    forumView.addSortButtonsListener();
    forumView.addNewThreadListener();

    const data = forumData.fetchForumData().then(data =>
        console.log(data)
    );

}

init();
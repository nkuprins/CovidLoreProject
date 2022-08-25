import NavView from "../view/navView";
import forumView from "../view/forumView";
import secureLogin from "../logginController";
import forumData from "../data/forumData"


const init = function () {

    secureLogin.initKeyCloak();

    new NavView(2).addHandlerNavHover();
    forumView.addSortButtonsListener();
    forumView.addNewThreadListener();

    forumData.fetchForumData().then(data =>
        forumView.showForumTopicView(data)
    );

}

export const processSortUpdate = function (sortOption, isAscending) {
    if (!forumData.forumData)
        return;

    const sortBy = sortOption === 'Like' ?
        (a, b) => (isAscending ? a.sumLike - b.sumLike : b.sumLike - a.sumLike) :
        (a, b) => (isAscending ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));

    forumData.forumData.sort(sortBy);
    forumView.showForumTopicView(forumData.forumData);
}

init();
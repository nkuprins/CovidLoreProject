import NavView from "../view/navView";
import forumView from "../view/forum/forumView";
import secureLogin from "../logginController";
import forumData from "../data/forumData"


const init = function () {

    secureLogin.initKeyCloak();

    new NavView(2).addHandlerNavHover();
    forumView.addSortButtonsListener(sortUpdateHandler);
    forumView.addNewThreadListener();
    forumView.addSubmitFormListener(formSubmitHandler);

    forumData.fetchForumData().then(data => {
            forumView.prepareForumTopicView();
            forumView.showForumTopicView(data);
        }
    );

}

const sortUpdateHandler = function (sortOption, isAscending) {
    if (!forumData.forumData)
        return;

    const sortBy = sortOption === 'Like' ?
        (a, b) => (isAscending ? a.sumLike - b.sumLike : b.sumLike - a.sumLike) :
        (a, b) => (isAscending ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));

    forumData.forumData.sort(sortBy);
    forumView.showForumTopicView(forumData.forumData);
}

const formSubmitHandler = function (title, description) {
    forumData.saveAJAX(title.trim(), description.trim());
}

init();
import NavView from "../view/navView";
import newsView from "../view/news/newsView";
import {AJAX_JSON} from "../helper";
import {API_NEWS_URL} from "../config";

const init = function () {

    new NavView(1).addHandlerNavHover();

    AJAX_JSON(API_NEWS_URL).then((data) => {
        if (data.news.length < 12)
            return;

        data.news = data.news.slice(0, 12)
        newsView.showNews(data.news);
        newsView.addNewsHoverListener();
        newsView.addSelectedNewsListener();
        newsView.addLoadSelectedNewsListener(data.news)

    });
}
init();
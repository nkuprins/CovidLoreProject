
import defaultNewsImg from '../../../img/defaultNewsImg.jpg'
import View from "../View";

class NewsView extends View {

    _newsList;

    constructor() {
        super();

        this._newsTbody = document.querySelector('tbody');
        this._readNewsBody = document.querySelector('.absolute__block__body');
        this._readNewsBackground = document.querySelector('.absolute__block__background');

        this.renderDarkSpinner('.news__section');
    }

    showNews(newsData) {
        this.removeSpinner();
        let markup = "<tr>";
        newsData.forEach((el, i) => markup += this._generateMarkupForTable(el, i + 1));
        this.insertCleanHTMLAfterBy(this._newsTbody, markup);
        this._newsList = document.querySelectorAll('p');
    }

    _generateMarkupForTable(el, i) {

        const newsBlockId = `newsBlock-${i-1}`;
        const backgroundImage = new Image();
        backgroundImage.src = el.image;

        // If we failed to load image due to API conflicts
        backgroundImage.onerror = () =>
            document.querySelector(`#${newsBlockId}`).style = `background-image: url('${defaultNewsImg}');`;

        const newsBlock = `<td id="${newsBlockId}" style="background-image: url('${backgroundImage.src}');">
                    <p id="news-${i - 1}" class="news__title">${el.title}</p></td>`

        if (i % 4 === 0) // end of tr and start of new tr
            return `${newsBlock}</tr><tr>`;

        return newsBlock; // td
    }

    addSelectedNewsListener() {
        this._newsList.forEach(el => el.addEventListener('click', this._handleShowingSelectedNews.bind(this)));
        document.querySelector('.absolute__block__button')
            .addEventListener('click', this._handleShowingSelectedNews.bind(this));
    }

    _handleShowingSelectedNews(e) {
        this._readNewsBackground.classList.toggle('no__event-obj');
        this._readNewsBody.classList.toggle('disabled-obj');
    }

    addLoadSelectedNewsListener(news) {
        this._newsList.forEach(el => el.addEventListener('click', this._handleLoadSelectedNews.bind(this, news)));
    }

    _handleLoadSelectedNews(news, e) {

        const index = e.target.id.slice(-1);
        this.insertCleanTextAfterBy('.absolute__block__title', news[index].title);
        this.insertCleanTextAfterBy('.selected__news__description', news[index].description);
        this.insertCleanHTMLAfterBy('.selected__news__resource', `<a href="${news[index].url}">Resource</a>`);
        this.insertCleanTextAfterBy('.selected__news__date', news[index].published.slice(0, 10));
    }

    addNewsHoverListener() {
        this._newsList.forEach(el => el.addEventListener('mouseover', this._handleNewsHover.bind(1.0)))
        this._newsList.forEach(el => el.addEventListener('mouseout', this._handleNewsHover.bind(0.0)))
    }

    _handleNewsHover(e) {
        document.querySelectorAll('p').forEach(el => {
            if (el === e.target)
                el.style.opacity = this;
            else
                el.style.opacity = 0.0;
        })
    }
}

export default new NewsView();
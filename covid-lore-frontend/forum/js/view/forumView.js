import sumLike from "../../img/like.png";
import sumDislike from "../../img/dislike.png";
import {processFormSubmit, processSortUpdate} from "../controller/forumController";


class ForumView {

    constructor() {
        this._addNewsBody = document.querySelector('.absolute__block__body');
        this._forumTableBody = document.querySelector(`tbody`);
        this.formTitle = document.getElementById(`title__field`);
        this.formDescription = document.getElementById(`description__field`);
    }

    showForumTopicView(data) {

        this._forumTableBody.innerHTML = ``;
        Object.entries(data).forEach(entry => {
            const [_, post] = entry;
            const markup = `<tr class="thread__body"
                onclick="window.location.href='/discussion.html?p=${post.postId}'">
                <td class="col1">${post.title}</td>
                <td>${post.creatorUsername}</td>
                <td>
                    <div>
                        <p class="thread__score-block">${post.sumLike}</p>
                        <img class="thread__score-block thread__image" src=${sumLike} alt="like">
                    </div>
                    <div>
                        <p class="thread__score-block">${post.sumDisLike}</p>
                        <img class="thread__score-block thread__image" src=${sumDislike} alt="dislike">
                    </div>
                </td>
                <td>${post.date}</td>
            </tr>`


            this._forumTableBody.insertAdjacentHTML('afterbegin', markup);
        })
    }

    _rotateImage(sortOption) {

        let sortImage = (sortOption === 'Like') ? document.querySelector('#top') : document.querySelector('#latest');
        let otherImage = (sortOption === 'Like') ? document.querySelector('#latest') : document.querySelector('#top');;

        sortImage.querySelector('.sort__icon').classList.toggle('rotate__sort__icon');
        otherImage.querySelector('.sort__icon').classList?.remove('rotate__sort__icon');

    }

    addSortButtonsListener() {
        document.querySelectorAll('.sort__element').forEach(el => el.addEventListener('click', this._handleSort.bind(this)))
    }

    _handleSort(e) {

        const el = e.target.closest('.sort__element');
        const sortOption = el.id === 'top' ? 'Like' : 'Date';
        const isAscending = !el.querySelector('.sort__icon').classList.contains('rotate__sort__icon')
        this._rotateImage(sortOption);
        processSortUpdate(sortOption, isAscending);
    }

    addNewThreadListener() {
        document.querySelector('.add__new__thread').addEventListener('click', this._handleNewThread.bind(this));
        document.querySelector('.absolute__block__button').addEventListener('click', this._handleNewThread.bind(this));
    }

    _handleNewThread() {
        document.querySelector('.absolute__block__background').classList.toggle('no__event-obj');
        this._addNewsBody.classList.toggle('disabled-obj');
    }

    addSubmitFormListener() {
        document.querySelector('form').addEventListener('submit', this._handleSubmit.bind(this));
    }

    _handleSubmit(e) {
        e.preventDefault();
        processFormSubmit(this.formTitle.value, this.formDescription.value);
    }
}

export default new ForumView();
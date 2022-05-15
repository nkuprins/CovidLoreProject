
class ForumView {

    constructor() {
        this._addNewsBody = document.querySelector('.absolute__block__body');
    }

    addSortButtonsListener() {
        document.querySelectorAll('.sort__element').forEach(el => el.addEventListener('click', this._handleSort))
    }

    _handleSort(e) {
        e.target.closest('.sort__element').querySelector('.sort__icon').classList.toggle('rotate__sort__icon');
    }

    addNewThreadListener() {
        document.querySelector('.add__new__thread').addEventListener('click', this._handleNewThread.bind(this));
        document.querySelector('.absolute__block__button').addEventListener('click', this._handleNewThread.bind(this));
    }

    _handleNewThread() {
        document.querySelector('.absolute__block__background').classList.toggle('no__event-obj');
        this._addNewsBody.classList.toggle('disabled-obj');
    }
}

export default new ForumView();
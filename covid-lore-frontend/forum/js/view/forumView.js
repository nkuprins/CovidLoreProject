import {AJAX_JSON} from "../helper";

class ForumView {

    constructor() {
        this._addNewsBody = document.querySelector('.absolute__block__body');
        this._rotateImage();
    }

    _rotateImage() {
        const urlParams = new URLSearchParams(window.location.search);
        const order = String(urlParams.get('o'));

        let sortImage;
        if (order.includes('Like'))
            sortImage = document.querySelector('#top');
        else if (order.includes('Date'))
            sortImage = document.querySelector('#latest');

        if (order.includes('Asc'))
            sortImage.querySelector('.sort__icon').classList.add('rotate__sort__icon')
    }

    addSortButtonsListener() {
        document.querySelectorAll('.sort__element').forEach(el => el.addEventListener('click', this._handleSort))
    }

    async _handleSort(e) {

        const response = await (await fetch("http://192.168.1.113:8090/callme/ping")).catch(err =>
        {
            console.log("ERRORRRRRRRR");
            console.log(err);
            window.location.href = "http://192.168.1.113:8090";
        }
        )



        // const el = e.target.closest('.sort__element');
        // const sortOption = el.id === 'top' ? 'Like' : 'Date';
        // const isAscending = !el.querySelector('.sort__icon').classList.contains('rotate__sort__icon')
        // const ascending = isAscending ? 'Asc' : 'Desc';
        //
        // window.location=`/forum?o=${sortOption}${ascending}`;
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
import spinnerImage from './../../img/spinner.png';
import spinnerDarkImage from './../../img/spinnerDark.png';

export default class View {

    _generateSpinner(selector, isDark) {
        console.log(spinnerImage);
        const markup =
            `<div class="spinner">
            <img src="${isDark ? spinnerDarkImage : spinnerImage}" alt="Show spinner while loading map">
                <p class="spinner__text">Fetching the data<br>Please wait</p>
            </div>`;
        this._getObjectByKey(selector).insertAdjacentHTML('afterbegin', markup);
    }

    renderSpinner(selector) {
        this._generateSpinner(selector, false);
    }

    renderDarkSpinner(selector) {
        this._generateSpinner(selector, true);
    }

    removeSpinner() {
        document.querySelector('.spinner')?.remove();
    }

    _getObjectByKey(selector) {
        let obj;
        if (typeof selector === "string")
            obj = document.querySelector(selector);
        else
            obj = selector;

        return obj;
    }

    insertCleanTextAfterBy(selector, text) {
        const obj = this._getObjectByKey(selector);
        if (obj === null) return;
        obj.innerText = '';
        obj.insertAdjacentText('afterbegin', text);
    }

    insertCleanHTMLAfterBy(selector, html) {
        const obj = this._getObjectByKey(selector);
        if (obj === null) return;
        obj.innerHTML = '';
        obj.insertAdjacentHTML('afterbegin', html);
    }
}
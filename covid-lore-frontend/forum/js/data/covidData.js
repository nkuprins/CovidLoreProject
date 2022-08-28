import {API_COVID_URL} from "../config";
import {AJAX_JSON, dataToNormalFormat, getTopByProperty} from "../helper";

class CovidData {

    _topConfirmedCases;
    _topDeathCases;

    get getTopConfirmedCases() {
        return this._topConfirmedCases;
    }

    get getTopDeathCases() {
        return this._topDeathCases;
    }

    get getCovidData() {
        return this._cachedData;
    }

    // If the data is cached, then load it, otherwise fetch it from API
    async loadData() {

        if (!localStorage.getItem('covidData')) {
            this._cachedData = await this._getCovidDataAjax(0);
            this._saveData();
        } else {
            // Load data from localStorage
            this._cachedData = JSON.parse(localStorage.getItem('covidData'));

            if (!this._hasFreshCache(this._cachedData[0].date_stamp.slice(-2))) {
                localStorage.clear();
                await this.loadData();
            } else {
                this._topConfirmedCases = JSON.parse(localStorage.getItem('covidTopConfirmed'));
                this._topDeathCases = JSON.parse(localStorage.getItem('covidTopDeath'));
            }
        }
    }

    // caching the data
    _saveData() {
        localStorage.setItem('covidData', JSON.stringify(this._cachedData));
        localStorage.setItem('covidTopConfirmed', JSON.stringify(this._topConfirmedCases));
        localStorage.setItem('covidTopDeath', JSON.stringify(this._topDeathCases));
        localStorage.setItem('triedToFetch', String(new Date().getHours()));
    }

    // We want to clear cache if the new data is published.
    _hasFreshCache(lastDate) {
        // We already tried to fetch ned data within an hour, so do not try until the new hour.
        if (localStorage.getItem('triedToFetch') === String(new Date().getHours()))
            return true;

        const timeDifference = Number(dataToNormalFormat(new Date()).slice(-2)) - Number(lastDate.slice(-2));
        return timeDifference === 1;
    }

    /*
        // Documentation of how to make request in this API:
        // https://documenter.getpostman.com/view/2220438/SzYevv9u?version=latest#3ebe13b4-7490-4165-9bd9-96af37f361e9

        // First parameter takes the offset in the following way (lastDataDate := currentDate-dayOffset)
     */
     async _getCovidDataAjax(dayOffset) {

        const lastDataDate = new Date();
        lastDataDate.setDate(lastDataDate.getDate() - dayOffset); // set Date to last available covid data day
        const dateFormatted = dataToNormalFormat(lastDataDate);

        const result = await AJAX_JSON(API_COVID_URL +
            `inject=true&cols=date_stamp,iso3166_1,cnt_confirmed,cnt_death&where=(date_stamp=${dateFormatted})` +
            `&format=amcharts&limit=5000`);

        if (!this._setTopCases(result.dataProvider)) {
            // The set of top cases failed, as there has not been published data on the current date yet.
            // So try to fetch data of a previous day.
            return await this._getCovidDataAjax(dayOffset + 1);
        } else {
            return Object.entries(result.dataProvider).map(el => el[1]); // For more information refer to API.
        }
    }


    // We need top 5 values for our charts.
    // Set data if hasValid is true
    _setTopCases(data) {

         if (data.length === 0) return false;

         // If at least one cnt_case(confirmed or death) is 0, then false
         const hasValidCases = (cases) => cases.findIndex(el => el.cnt_case === 0) === -1;

         this._topConfirmedCases = getTopByProperty(data, 'cnt_confirmed', 5);
         if (!hasValidCases(this._topConfirmedCases))
            return false;

         this._topDeathCases = getTopByProperty(data, 'cnt_death', 5);
         return hasValidCases(this._topDeathCases)
    }
}

export default new CovidData();
import {API_MAP_URL, HIGH_LEVEL, LOW_LEVEL, MEDIUM_LEVEL} from "../../config";
import {findDataByCountry, readJSONCountriesGeolocation} from "../../helper";
import View from "../View";

class MapView extends View {

    constructor() {
        super();
        this.renderSpinner('#map');
    }

    generateMap(data) {
        this.map = L.map('map').setView([51.508, -0.11], 5);
        this.map.whenReady(() => {
            //this.removeSpinner();
            this._showMap();
            this._addMarkerToEachCountry(data)
            this.map.invalidateSize();
        });
    }

    _showMap() {
        L.tileLayer(API_MAP_URL, {
            attribution:
                '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>,' +
                ' &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>' +
                ' &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            trackResize: false
        }).addTo(this.map);
    }

    _optionColorProcess(covidCasesNum) {
        switch (true) {
            case (covidCasesNum < LOW_LEVEL): return 'yellow';
            case (covidCasesNum < MEDIUM_LEVEL): return 'orange';
            default: return 'red';
        }
    }

    _optionSizeProcess(covidCasesNum) {
        switch (true) {
            case (covidCasesNum < LOW_LEVEL):return 50_000;
            case (covidCasesNum < MEDIUM_LEVEL):return 70_000;
            case (covidCasesNum < HIGH_LEVEL):return 100_000;
            default: return 200_000;
        }
    }

    _addMarkerToEachCountry(covidData) {
        Object.entries(readJSONCountriesGeolocation()).forEach((geolocation) => {
            const [countryName, location] = geolocation;
            const covidValues = findDataByCountry(covidData, countryName);
            if (covidValues === undefined) return;

            const {cnt_confirmed: covidCasesNum } = covidValues;
            const optionColor = this._optionColorProcess(Number(covidCasesNum));
            const optionRadius = this._optionSizeProcess(Number(covidCasesNum));

            // Generate marker
            const circle = L.circle([location.latitude, location.longitude], {
                color: optionColor,
                fillColor: optionColor,
                fillOpacity: 0.5,
                radius: optionRadius
            }).addTo(this.map);

            // Write text to marker
            const {date_stamp: dataDate} = covidValues;
            circle.bindPopup(
                `<b>${countryName}</b><br>
                Date: ${dataDate}<br>
                Overall: ${covidCasesNum.toLocaleString()} cases`, {'className' : 'popupCustom'})
        });
    }
}

export default new MapView();
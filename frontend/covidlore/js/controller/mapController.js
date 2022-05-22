
import NavView from "../view/navView.js";
import "../view/map/mapView.js";
import "../view/map/chartView.js";
import 'charts.css';
import covidData from "../model/covidData";
import chartView from "../view/map/chartView";
import mapView from "../view/map/mapView";

const init = function () {

    new NavView(0).addHandlerNavHover();
    document.querySelectorAll('.section').forEach(el => el.classList.add('display-no-obj'));

    covidData.loadData().then(() => {
        const data = covidData.getCovidData;
        chartView.renderChart(covidData.getTopConfirmedCases, 1);
        chartView.renderChart(covidData.getTopDeathCases, 2);
        document.querySelectorAll('.section').forEach(el => el.classList.remove('display-no-obj'));
        mapView.generateMap(data);
    });

}

init();
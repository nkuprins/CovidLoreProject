
import NavView from "../view/navView.js";
import "../view/map/mapView.js";
import "../view/map/chartView.js";
import 'charts.css';
import covidData from "../model/CovidData";
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

var apiEndpoint = "http://localhost:8080/api/greetings"
var el = document.createElement("h1")

fetch(apiEndpoint + "/webpack")
    .then(function(response) {
        return response.json()
    })
    .then(function(obj) {
        el.innerHTML = "Zalupa" + "<br>" + obj.content + "<br>At " + obj.time
        document.body.appendChild(el)
        init();
    })
    .catch(function(err) {
        el.innerHTML = "oh no…"
        document.body.appendChild(el)
    })
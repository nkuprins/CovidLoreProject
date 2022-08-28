import View from "../View";

class ChartView extends View {

    _chartSection1 = document.querySelector('#section--1');
    _chartSection2 = document.querySelector('#section--2');

    constructor() {
        super();
        if (!localStorage.getItem('chartsObserved')) {
            this._observeSection(this._chartSection1);
            this._observeSection(this._chartSection2);
        } else {
            document.querySelectorAll('.charts-css').forEach(el => el.classList.remove('hidden-obj'));
            this._removeArrow();
        }
    }

    _removeArrow() {
        document.querySelector('.arrow__section')?.remove();
    }

    _observeSection(chartSection) {
        const _sectionObserver = new IntersectionObserver(this._revealSection.bind(this), {
            root: null,
            threshold: 0.5
        })

        _sectionObserver.observe(chartSection);
    }

    _revealSection(entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        const countryChart = entry.target.querySelector('.charts-css').classList;
        countryChart.remove('hidden-obj');
        countryChart.add('chart__animation');
        this._removeArrow();
        observer.unobserve(entry.target);
        localStorage.setItem('chartsObserved', 'true');
    }

    renderChart(data, indexOfBody) {
        this._addChartToSection(data.map(el => el.countryName),
            data.map(el => el.cnt_case), document.querySelector(`#chartTBody-${indexOfBody}`));
    }

    // Key - is the title of the chart column
    // Value - is the value of the chart column
    _addChartToSection(chartKeys, chartValues, chartBody) {
        const markup = `
        <tr>
            <th scope="row">${chartKeys[0]}</th>
            <td style="--size:${chartValues[0] / chartValues[4]};">${chartValues[0].toLocaleString()}</td>
        </tr>
        <tr>
            <th scope="row">${chartKeys[1]}</th>
            <td style="--size:${chartValues[1] / chartValues[4]};">${chartValues[1].toLocaleString()}</td>
        </tr>
        <tr>
            <th scope="row">${chartKeys[2]}</th>
            <td style="--size:${chartValues[2] / chartValues[4]};">${chartValues[2].toLocaleString()}</td>
        </tr>
        <tr>
            <th scope="row">${chartKeys[3]}</th>
            <td style="--size:${chartValues[3] / chartValues[4]};">${chartValues[3].toLocaleString()}</td>
        </tr>
        <tr>
            <th scope="row">${chartKeys[4]}</th>
            <td style="--size:0.9;">${chartValues[4].toLocaleString()}</td>
        </tr>`;

        this.insertCleanHTMLAfterBy(chartBody, markup);
    }
}

export default new ChartView();
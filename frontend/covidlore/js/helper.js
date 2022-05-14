
export const readJSONCountriesGeolocation = function () {
    return require('../../countriesData');
}

export const readJSONExampleData = function () {
    return require('../../exampleData.json');
}

export const findDataByCountry = function (data, countryName) {
    return data.find(el => el.iso3166_1 === countryName);
}

// Get top 5 values in array of object in the ascending order.
// The property defines the value to compare by
// and also the returned value in the new object.
export const getTopByProperty = function (array, property, N) {
    return array.sort((a, b) => b[property] - a[property])
        .slice(0, N)
        .reverse()
        .map(el => ({ countryName: el.iso3166_1, cnt_case: el[property] }));
}

export const dataToNormalFormat = function (date) {
    return date.toISOString().substring(0, date.toISOString().indexOf('T'));
}

export const AJAX = async function (url) {
    const fetchData = fetch(url);
    const response = (await fetchData).json();
    return await response;
}
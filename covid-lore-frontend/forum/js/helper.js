
export const readJSONCountriesGeolocation = function () {
    return require('../../countriesData');
}

// Search in data until we get the valid data by country name
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

// Data is of the format 2022-01-01
export const dataToNormalFormat = function (date) {
    return date.toISOString().substring(0, date.toISOString().indexOf('T'));
}

export const AJAX_JSON = async function (url) {
    return AJAX_JSON_HEADER(url)
}

export const AJAX_JSON_HEADER = async function (url, header) {
    const fetchData = fetch(url, header);
    const response = (await fetchData).json();
    return await response;
}

export const AJAX_PLAIN = async function (url) {
    return AJAX_PLAIN_HEADER(url);
}

export const AJAX_PLAIN_HEADER = async function (url, header) {
    const fetchData = fetch(url, header);
    const response = (await fetchData).text();
    return await response;
}
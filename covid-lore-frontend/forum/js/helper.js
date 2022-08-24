
export const AJAX_JSON = async function (url) {
    return AJAX_JSON_HEADER(url)
}

export const AJAX_JSON_HEADER = async function (url, header) {
    const fetchData = fetch(url, header);
    const response = (await fetchData).text();
    return await response;
}

export const AJAX_PLAIN = async function (url) {
    const fetchData = fetch(url);
    const response = (await fetchData).text();
    return await response;
}
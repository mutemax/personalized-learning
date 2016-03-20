define([''], function () {

    return {
        getQueryStringValue: getQueryStringValue
    };

    function getQueryStringValue(key) {
        var urlParams = window.location.search;
        var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        var results = regex.exec(urlParams);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
});
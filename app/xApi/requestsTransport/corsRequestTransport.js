define(['jquery', '../errorHandling/errorHandler', 'Q'], function ($, errorHandler, Q) {
    "use strict";

    var transport = {
        sendRequest: sendRequest
    };

    return transport;

    function sendRequest(requestSettings) {
        var defer = Q.defer();

        requestSettings.type = 'POST';
        requestSettings.headers['Content-Type'] = 'application/json';
        requestSettings.contentType = 'application/json';
        requestSettings.dataType = 'json';
        requestSettings.async = true;

        requestSettings.success = function (response) {
            defer.resolve(response);
        };

        requestSettings.error = function (request, textStatus, error) {
            defer.reject(textStatus);
            handleRequestError(request, textStatus, error);
        };

        $.ajax(requestSettings);

        return defer.promise;
    }

    function handleRequestError(request, textStatus, error) {
        errorHandler.handlexApiError();
    }

});
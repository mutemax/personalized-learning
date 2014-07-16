define(['Q'], function (Q) {
    "use strict";

    var transport = {
        sendRequest: sendRequest
    };

    return transport;

    function sendRequest(requestSettings) {
        requestSettings.type = 'POST';
        requestSettings.headers['Content-Type'] = 'application/json';
        requestSettings.contentType = 'application/json';
        requestSettings.dataType = 'json';
        requestSettings.async = true;

     /*   requestSettings.success = function (response) {
            defer.resolve(response);
        };

        requestSettings.error = function (request, textStatus, error) {
            defer.reject(textStatus);
            handleRequestError(request, textStatus, error);
        };
        */
        requestSettings.url += '?method=' + requestSettings.type;

        var formData = [];

        for (var headerName in requestSettings.headers) {
            formData.push(headerName + "=" + encodeURIComponent(requestSettings.headers[headerName]));
        }

        if (!_.isUndefined(requestSettings.data)) {
            formData.push('content=' + encodeURIComponent(requestSettings.data));
        }

        requestSettings.headers = {};
        requestSettings.data = formData.join("&");

        return sendXdrRequest(requestSettings);
    }

    function sendXdrRequest(requestSettings) {
        var defer = Q.defer();
        var xdr = new window.top.XDomainRequest();

        function callback(status, statusText, responses, responseHeaders) {
            xdr.onload = xdr.onerror = xdr.ontimeout = jQuery.noop;
            xdr = undefined;
            complete(status, statusText, responses, responseHeaders);
        }

        xdr.onload = function () {
            callback(200, "OK", { text: xdr.responseText });
            defer.resolve(xdr.responseText);
        };

        xdr.onerror = function () {
            callback(-1, 'XDomainRequest error');
        };

        if (requestSettings.timeout) {
            xdr.timeout = requestSettings.timeout;
            xdr.ontimeout = function () {
                callback(-1, 'XDomainRequest timed out');
            };
        }

        try {
            xdr.open(requestSettings.type, requestSettings.url, true);
        }
        catch (e) {
            var errorMessage;

            if (location.protocol != requestSettings.url.split("/")[0])
                errorMessage = 'XDomainRequest invalid protocol';
            else
                errorMessage = e.message;

            callback(-1, errorMessage);

            defer.reject(errorMessage);
            return;
        }

        xdr.send((requestSettings.hasContent && requestSettings.data) || null);

        return defer;
    }

    function handleRequestError(request, textStatus, error) {
        console.log('Error - ' + textStatus);
    }

});
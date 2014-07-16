define(['browserDetector', './xDomainRequestTransport', './corsRequestTransport', '../utils/base64', '../configuration/settings', 'jquery'],
    function (browserDetector, xDomainRequestTransport, corsRequestTransport, base64, settingsModule, $) {
        "use strict";

        var transport;

        var requestSender = {
            initialize: initialize,

            sendStatement: sendStatement
        };

        return requestSender;

        function initialize() {
            if ($.support.cors) {
                transport = corsRequestTransport;
            } else if (!_.isUndefined(window.top.XDomainRequest)) {
                transport = xDomainRequestTransport;
            }
        }

        function sendStatement(statement) {
            return transport.sendRequest(createRequestFromStatement(statement));
        }

        function createRequestFromStatement(statement) {

            var
                headers = [],
                requestOptions = {};

            headers['Authorization'] = getAuthorizationHeader();
            headers['X-Experience-API-Version'] = settingsModule.settings.xApiVersion;

            requestOptions.headers = headers;
            requestOptions.url = settingsModule.settings.xApi.lrs.uri;
            requestOptions.timeout = settingsModule.settings.timeout;

            requestOptions.data = JSON.stringify(statement);

            return requestOptions;
        }

        function getAuthorizationHeader() {
            var userName = settingsModule.settings.anonymousCredentials.username;
            var password = settingsModule.settings.anonymousCredentials.password;

            var lsrCourseSettings = settingsModule.settings.xApi.lrs;
            if (lsrCourseSettings.authenticationRequired) {
                userName = lsrCourseSettings.credentials.username;
                password = lsrCourseSettings.credentials.password;
            }

            return "Basic " + base64.encode(userName + ':' + password);
        }

    }
);
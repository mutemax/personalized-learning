define(['plugins/http', 'Q'], function (http, Q) {
    "use strict";

    var publishSettingsModule = {
        publishSettings: {
            modules: []
        },
        initialize: initialize
    };

    return publishSettingsModule;

    function initialize() {

        var defer = Q.defer();
        $.getJSON('publishSettings.js?v=' + Math.random()).then(function (json) {
            $.extend(publishSettingsModule.publishSettings, json);
            defer.resolve(json);
        }).fail(function () {
            defer.resolve({});
        });

        return defer.promise.then(function (settings) {
            $.extend(publishSettingsModule.publishSettings, settings);
        });
    }

});
define(['plugins/http', 'Q'], function (http, Q) {
    "use strict";

    var courseSettingsModule = {
        courseSettings: {
            logo: { url: '' },
            xApi: {
                enabled: false
                
            }
        },
        initialize: initialize
    };

    return courseSettingsModule;

    function initialize() {

        var defer = Q.defer();
        $.getJSON('settings.js?v=' + Math.random()).then(function (json) {
            $.extend(courseSettingsModule.courseSettings, json);
            defer.resolve(json);
        }).fail(function () {
            defer.resolve({});
        });

        return defer.promise.then(function (settings) {
            $.extend(courseSettingsModule.courseSettings, settings);
        });
    }

});
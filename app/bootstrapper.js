define(function (require) {
    "use strict";

    var customBindings = require('customBindings');
    customBindings.init();


    var system = require('durandal/system');
    system.defer = function (action) {
        var deferred = Q.defer();
        action.call(deferred, deferred);
        var promise = deferred.promise;
        deferred.promise = function () {
            return promise;
        };
        return deferred;
    };


    var http = require('plugins/http');
    http.get = function (url, query) {
        return Q($.ajax(url, { data: query }));
    };

    http.post = function (url, data) {
        return Q($.ajax({
            url: url,
            data: ko.toJSON(data),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json'
        }));
    };

    var binder = require('durandal/binder');
    binder.bindingComplete = (function () {

        var handlers = {};

        var f = function (data, view) {
            var key = $(view).attr('data-view');

            if (key && handlers[key]) {
                _.each(handlers[key], function (handler) {
                    handler.apply(null, [view]);
                });
            }
        }

        f.addHandler = function (key, handler) {
            if (!_.isArray(handlers[key])) {
                handlers[key] = [];
            }

            handlers[key].push(handler);
        }

        return f;

    })();
    binder.bindingComplete.addHandler('views/FillInTheBlanks', require('views/handlers/FillInTheBlanks'));


    return {

    };

});
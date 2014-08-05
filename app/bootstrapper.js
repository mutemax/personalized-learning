define(['customBindings', 'durandal/system',  'plugins/http'], function(customBindings, system, http) {
    "use strict";

    customBindings.init();

    system.defer = function(action) {
        var deferred = Q.defer();
        action.call(deferred, deferred);
        var promise = deferred.promise;
        deferred.promise = function() {
            return promise;
        };
        return deferred;
    };

    http.get = function(url, query) {
        return Q($.ajax(url, { data: query }));
    };

    http.post = function(url, data) {
        return Q($.ajax({
            url: url,
            data: ko.toJSON(data),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json'
        }));
    };

    return {

    };

});
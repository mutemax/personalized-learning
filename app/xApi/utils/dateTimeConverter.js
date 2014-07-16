define(['../guard'], function (guard) {
    "use strict";

    var dateTimeConverter = {
        timeToIsoDurationString: timeToIsoDurationString
    };

    return dateTimeConverter;

    function timeToIsoDurationString(timeInMilliseconds) {
        guard.throwIfNotNumber(timeInMilliseconds, 'You should provide only number');

        var timeInSeconds = timeInMilliseconds / 1000;

        var hours = parseInt(timeInSeconds / 3600, 10);
        timeInSeconds -= hours * 3600;

        var minutes = parseInt(timeInSeconds / 60, 10);
        timeInSeconds -= minutes * 60;

        var seconds = parseInt(timeInSeconds, 10);

        return 'PT' + hours + 'H' + minutes + 'M' + seconds + 'S';
    }

});
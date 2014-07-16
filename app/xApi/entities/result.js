define(['../guard'], function (guard) {
    "use strict";

    function Result(spec) {
        guard.throwIfSpecIsUndefined(spec, 'Result');

        if (typeof spec.score != typeof undefined) {
            this.score = spec.score;
        }

        if (typeof spec.duration != typeof undefined) {
            guard.throwIfNotISODuration(spec.duration, 'You should provide duration in correct ISO duration format.');
            this.duration = spec.duration;
        }

        if (typeof spec.response != typeof undefined) {
            this.response = spec.response;
        }
    }

    return Result;
});
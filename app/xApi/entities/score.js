define(['../guard'], function (guard) {
    "use strict";

    function Score(spec) {
        guard.throwIfSpecIsUndefined(spec, 'Score');
        guard.throwIfNotNumber(spec, 'You should provide score');

        if (spec >= 0 && spec <= 1) {
            this.scaled = spec;
        } else {
            this.raw = spec;
        }
    }

    return Score;
});
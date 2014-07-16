define(['../guard'], function (guard) {
    "use strict";

    function Object(spec) {
        guard.throwIfSpecIsUndefined(spec, 'Object');

        guard.throwIfNotString(spec.objectType, 'You should provide object type');

        this.objectType = spec.objectType;
    }

    return Object;
});
define(['../guard'], function (guard) {
    "use strict";

    function Context(spec) {
        guard.throwIfSpecIsUndefined(spec, 'Context');

        guard.throwIfNotAnObject(spec.contextActivities, 'You should provide context activities to create Context');

        this.contextActivities = spec.contextActivities;
    }

    return Context;
});
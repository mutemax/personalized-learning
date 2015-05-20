define(['../guard'], function (guard) {
    "use strict";

    function Context(spec) {
        guard.throwIfSpecIsUndefined(spec, 'You should provide a specification to create Context');
        guard.throwIfNotAnObject(spec.contextActivities, 'You should provide context activities to create Context');
        guard.throwIfNotString(spec.registration, 'You should specify registration field for the context');

        this.registration = spec.registration;
        this.contextActivities = spec.contextActivities;
    }

    return Context;
});
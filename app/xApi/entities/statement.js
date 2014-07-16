define(['../guard', 'durandal/system'], function (guard, system) {
    "use strict";

    function Statement(spec) {
        guard.throwIfSpecIsUndefined(spec, 'Statement');

        guard.throwIfNotAnObject(spec.actor, 'You should provide actor for Statement');
        guard.throwIfNotAnObject(spec.verb, 'You should provide verb for Statement');
        guard.throwIfNotAnObject(spec.object, 'You should provide object for Statement');

        this.id = system.guid();
        this.actor = spec.actor;
        this.verb = spec.verb;
        this.object = spec.object;
        this.timestamp = (new Date()).toISOString();

        if (_.isObject(spec.context)) {
            this.context = spec.context;
        }

        if (_.isObject(spec.result)) {
            this.result = spec.result;
        }
    }

    return Statement;
});
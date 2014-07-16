define(['../guard'], function (guard) {
    "use strict";

    function ContextActivities(spec) {
        guard.throwIfSpecIsUndefined(spec, 'ContextActivities');
        
        if (typeof spec.parent != typeof undefined) {
            this.parent = spec.parent;
        }

        if (typeof spec.grouping != typeof undefined) {
            this.grouping = spec.grouping;
        }
    }

    return ContextActivities;
});
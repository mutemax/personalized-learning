define(['../guard', './object'], function (guard, ObjectEntity) {
    "use strict";

    function Actor(spec) {
        spec.objectType = 'Agent';

        ObjectEntity.call(this, spec);

        guard.throwIfNotMbox(spec.mbox, 'You should provide mbox identity for Actor');

        this.name = spec.name;
        this.mbox = spec.mbox;
    }

    return Actor;
});
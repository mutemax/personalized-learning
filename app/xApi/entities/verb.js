define(['../guard'], function (guard) {
    "use strict";

    function Verb(spec) {
        guard.throwIfSpecIsUndefined(spec, 'Verb');

        guard.throwIfNotVerbId(spec.id, 'You should provide valid id for Verb');
        guard.throwIfNotLanguageMap(spec.display, 'You should provide valid language map as display for Verb');

        this.id = spec.id;
        this.display = spec.display;
    }

    return Verb;
});
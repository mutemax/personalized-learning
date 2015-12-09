define(['./verbs', 'constants'], function (verbs, constants) {
    "use strict";

    var
        guard = {
            throwIfNotMbox: throwIfNotMbox,
            throwIfNotEmail: throwIfNotEmail,
            throwIfNotLanguageMap: throwIfNotLanguageMap,
            throwIfNotVerbId: throwIfNotVerbId,
            throwIfNotString: throwIfNotString,
            throwIfNotAnObject: throwIfNotAnObject,
            throwIfNotNumber: throwIfNotNumber,
            throwIfNotIsoDuration: throwIfNotIsoDuration,
            throwIfSpecIsUndefined: throwIfSpecIsUndefined
        };

    return guard;

    function throwIfNotIsoDuration(duration, message) {
        if (!_.isString(duration)) {
            throw message;
        }

        if (!constants.patterns.isoDuration.test(duration)) {
            throw message;
        }
    }

    function throwIfNotMbox(mbox, message) {
        if (!_.isString(mbox)) {
            throw message;
        }

        if (mbox.indexOf('mailto:') == -1) {
            throw message;
        }

        try {
            throwIfNotEmail(mbox.split('mailto:')[1]);
        } catch (e) {
            throw message;
        }
    }

    function throwIfNotEmail(email, message) {
        if (!_.isString(email)) {
            throw message;
        }

        if (!constants.patterns.email.test(email)) {
            throw message;
        }
    }

    function throwIfNotLanguageMap(display, message) {
        if (!_.isObject(display)) {
            throw message;
        }

        for (var locale in display) {
            if (!_.isString(display[locale])) {
                throw message;
            }
        }
    }

    function throwIfNotVerbId(id, message) {
        if (!_.isString(id)) {
            throw message;
        }

        var isVerIdValid = false;
        for (var verb in verbs) {
            if (verbs[verb].id === id) {
                isVerIdValid = true;
                break;
            }
        }

        if (!isVerIdValid) {
            throw message;
        }
    }

    function throwIfNotString(text, message) {
        if (!_.isString(text)) {
            throw message;
        }
    }

    function throwIfNotAnObject(item, message) {
        if (!_.isObject(item)) {
            throw message;
        }
    }

    function throwIfNotNumber(item, message) {
        if (!_.isNumber(item)) {
            throw message;
        }
    }

    function throwIfSpecIsUndefined(spec, entityName) {
        if (typeof spec == typeof undefined) {
            throw 'You should provide a specification to create ' + entityName;
        }
    }

});
define(['../verbs'], function (verbs) {
    "use strict";

    var settingsModule = {
        initialize: initialize
    };

    settingsModule.settings = {
        scoresDistribution: {
            positiveVerb: verbs.passed
        },

        actor: {
            name: '',
            email: ''
        },

        anonymousCredentials: {
            username: "",
            password: ""
        },

        xApi: {
            allowedVerbs: []
        },

        timeout: 120000, //2 minutes

        defaultLanguage: "en-US",
        xApiVersion: "1.0.0",
    };

    return settingsModule;

    function initialize(templateSettings) {
        $.extend(settingsModule.settings.xApi, templateSettings);
    }

});
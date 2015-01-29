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
            username: '',
            password: ''
        },

        xApi: {
            allowedVerbs: [],
            lrs: {
                uri: ''
            }
        },

        timeout: 120000, //2 minutes

        defaultLanguage: "en-US",
        xApiVersion: "1.0.0",
    };

    var defaultXapi = {
        lrs: {
            uri: '//reports.easygenerator.com/xApi/statements',
            authenticationRequired: false,
            credentials: {
                username: '',
                password: ''
            }
        },
        allowedVerbs: ['started', 'stopped', 'mastered', 'passed', 'failed']
    };


    return settingsModule;

    function initialize(templateSettings) {
        if (templateSettings.selectedLrs != 'default') {
            $.extend(settingsModule.settings.xApi, templateSettings);
        } else {
            $.extend(settingsModule.settings.xApi, defaultXapi);
        }

        var lrsUrl = settingsModule.settings.xApi.lrs.uri;
        if (lrsUrl.indexOf("/statements") == -1) {
            settingsModule.settings.xApi.lrs.uri = lrsUrl + "/statements";
        }

    }

});
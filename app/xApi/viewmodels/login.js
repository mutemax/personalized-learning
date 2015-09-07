define(['knockout', 'durandal/app', '../configuration/settings', '../initializer', 'eventManager', 'templateSettings', 'userContext'], function (ko, app, settingsModule, initializer, eventManager, templateSettings, userContext) {
    "use strict";

    var viewModel = {
        username: (function () {
            var value = ko.observable();

            value.isValid = ko.computed(function () {
                return value() && value().length;
            });

            return value;
        })(),
        email: (function () {
            var value = ko.observable();

            value.isValid = ko.computed(function () {
                return value() && /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,6})+)$/.test(value());
            });

            return value;
        })(),
        showError: ko.observable(false),
        reportRequired: templateSettings.xApi.required,

        callback: null,
        justStart: justStart,
        report: report,
        activate: activate
    };

    return viewModel;

    function activate() {
        var user = userContext.getCurrentUser();
        if (user) {
            viewModel.username(user.username);
            viewModel.email(user.email);
            viewModel.showError(true);
        }
    }

    function justStart() {
        if (viewModel.reportRequired) {
            return;
        }

        app.trigger('xApi:authentication-skipped');
    }

    function report() {
        if (viewModel.username.isValid() && viewModel.email.isValid()) {

            settingsModule.settings.actor.name = viewModel.username();
            settingsModule.settings.actor.email = viewModel.email();

            initializer.initialize().then(function () {
                return eventManager.courseStarted();
            }).then(function () {
                app.trigger('xApi:authenticated',
                {
                    username:viewModel.username(),
                    email:viewModel.email()
                });
            });
        } else {
            viewModel.showError(true);
        }

    }
})
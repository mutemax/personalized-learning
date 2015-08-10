define(['entities/course', './activityProvider', './configuration/settings', './requestsTransport/requestSender', 'templateSettings', './statementsQueueHandler', 'Q', 'progressContext', 'controller'],
    function (course, activityProvider, settingsModule, requestSender, templateSettings, statementsQueueHandler, Q, progressContext, controller) {
        "use strict";

        var initializer = {
            initialize: initialize
        };

        return initializer;

        function initialize() {
            return Q.fcall(function () {
                var pageUrl = "";
                debugger
                if (window != window.top && ('referrer' in document)) {
                    pageUrl = document.referrer;
                } else {
                    pageUrl = window.location.toString();
                }

                var url = pageUrl + '?course_id=' + course.id;
                var title = course.title;
                var progress = progressContext.get();
                var actor = settingsModule.settings.actor;

                if (_.isObject(progress)) {
                    if (_.isObject(progress.user)) {
                         return activityProvider.initialize(course.id, progress.user.username, progress.user.email, title, url);
                    }
                    if (progress.user === 0) {
                        activityProvider.actor = {};
                        return controller.activate();
                    }
                   
                }
                
                requestSender.initialize();
                settingsModule.initialize(templateSettings.xApi);
                statementsQueueHandler.handle();
                activityProvider.initialize(course.id, actor.name, actor.email, title, url);

            });
        }

    });
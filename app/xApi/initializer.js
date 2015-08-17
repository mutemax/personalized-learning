define(['entities/course', './activityProvider', './configuration/settings', './requestsTransport/requestSender', 'templateSettings', './statementsQueueHandler', 'Q', 'progressContext'],
    function (course, activityProvider, settingsModule, requestSender, templateSettings, statementsQueueHandler, Q, progressContext) {
        "use strict";

        var initializer = {
            initialize: initialize
        };

        return initializer;

        function initialize() {
            return Q.fcall(function () {
                var pageUrl = "";
                
                if (window != window.top && ('referrer' in document)) {
                    pageUrl = document.referrer;
                } else {
                    pageUrl = window.location.toString();
                }
                var url = pageUrl + '?course_id=' + course.id;
                var title = course.title;
                var progress = progressContext.get();

                var actor = settingsModule.settings.actor;
                if (_.isObject(progress)&& !_.isNull(progress.user)) {

                    if (_.isObject(progress.user)) {
                        actor = {
                            name: progress.user.username,
                            email: progress.user.email
                        };
                    }
                    if (progress.user === 0) {
                        activityProvider.actor = {};
                        return;
                    }

                }

                requestSender.initialize();
                settingsModule.initialize(templateSettings.xApi);
                statementsQueueHandler.handle();
                activityProvider.initialize(course.id, actor.name, actor.email, title, url);

            });
        }

    });
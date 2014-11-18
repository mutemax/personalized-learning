define(['entities/course', './activityProvider', './configuration/settings', './requestsTransport/requestSender', 'courseSettingsModule', './statementsQueueHandler', 'Q'],
    function (course, activityProvider, settingsModule, requestSender, courseSettingsModule, statementsQueueHandler, Q) {
    "use strict";

    var initializer = {
        initialize: initialize
    };

    return initializer;

    function initialize() {
        return Q.fcall(function() {
            var pageUrl = "";
            if (window != window.top && ('referrer' in document)) {
                pageUrl = document.referrer;
            } else {
                pageUrl = window.location.toString();
            }

            var url = pageUrl + '?course_id=' + course.id;
            var title = course.title;
            var actor = settingsModule.settings.actor;

            requestSender.initialize();
            settingsModule.initialize(courseSettingsModule.courseSettings.xApi);
            statementsQueueHandler.handle();

            activityProvider.initialize(course.id, actor.name, actor.email, title, url);
        });
    }

});
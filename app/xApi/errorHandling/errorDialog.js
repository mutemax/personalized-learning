define(['plugins/dialog', 'plugins/router', 'durandal/app', 'text!./errorDialog.html', 'durandal/viewEngine'], function (dialog, router, app, dialogMarkup, viewEngine) {
    "use strict";

    var errorDialog = new dialog.MessageBox();
    errorDialog.restartCourse = restartCourse;
    errorDialog.continueLearning = continueLearning;
    errorDialog.getView = getView;
    return errorDialog;

    function restartCourse() {
        var rootUrl = location.toString().replace(location.hash, '').replace('#', '');
        router.navigate(rootUrl, { replace: false, trigger: true });
    }

    function continueLearning() {
        app.trigger('xapi:turnOff');
        dialog.close(errorDialog);
    }

    function getView() {
        return viewEngine.processMarkup(dialogMarkup);
    }

});
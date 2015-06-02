define(['plugins/dialog', 'durandal/app', 'text!./errorDialog.html', 'durandal/viewEngine', 'templateSettings'], function (dialog, app, dialogMarkup, viewEngine, settings) {
    "use strict";

    var errorDialog = new dialog.MessageBox();
    errorDialog.restartCourse = restartCourse;
    errorDialog.continueLearning = continueLearning;
    errorDialog.getView = getView;
    errorDialog.allowToContinue = !settings.xApi.required;

    return errorDialog;

    function restartCourse() {
        location.reload();
    }

    function continueLearning() {
        if (!errorDialog.allowToContinue) {
            return;
        }

        app.trigger('xapi:turnOff');
        dialog.close(errorDialog);
    }

    function getView() {
        return viewEngine.processMarkup(dialogMarkup);
    }

});
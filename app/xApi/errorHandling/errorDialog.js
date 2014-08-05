define(['plugins/dialog', 'durandal/app', 'text!./errorDialog.html', 'durandal/viewEngine'], function (dialog, app, dialogMarkup, viewEngine) {
    "use strict";

    var errorDialog = new dialog.MessageBox();
    errorDialog.restartCourse = restartCourse;
    errorDialog.continueLearning = continueLearning;
    errorDialog.getView = getView;
    return errorDialog;

    function restartCourse() {
        location.reload();
    }

    function continueLearning() {
        app.trigger('xapi:turnOff');
        dialog.close(errorDialog);
    }

    function getView() {
        return viewEngine.processMarkup(dialogMarkup);
    }

});
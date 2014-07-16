define(['./errorDialog', 'plugins/dialog'], function (errorDialog, dialog) {
    "use strict";

    var handler = {
        handlexApiError: handlexApiError
    };

    return handler;

    function handlexApiError() {
        dialog.show(errorDialog);
    }

});
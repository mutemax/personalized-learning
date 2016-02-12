define(['translation'],
    function(translation) {

        "use strict";

        var
            windowOperations = {
                close: close
            };

        return windowOperations;

        function close(callback) {
            window.close();
            if (!inIframe()) {
                _.delay(function () {
                    if (callback) {
                        callback();
                    }
                    window.alert(translation.getTextByKey('[thank you message]'));
                }, 100);
            }
        }
        
        function inIframe() {
            // browsers can block access to window.top due to same origin policy, so exception can be thrown here.
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        }
    }
);
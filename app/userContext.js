define(['urlUtils'], function (urlUtils) {
    var self = {
        currentUser: null
    },
        context = {
            initialize: initialize,
            getCurrentUser: getCurrentUser
        }
    ;

    return context;

    function getCurrentUser() {
        return self.currentUser;
    }

    function initialize() {
        return Q.fcall(function () {
            var username = urlUtils.getQueryStringValue('name'),
                email = urlUtils.getQueryStringValue('email');

            if (username || email) {
                self.currentUser = { username: username, email: email };
            }
        });
    }
});
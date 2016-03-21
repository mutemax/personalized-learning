define(['queryStringParameters'], function (queryStringParameters) {
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
            var username = queryStringParameters.get('name'),
                email = queryStringParameters.get('email');

            if (username || email) {
                self.currentUser = { username: username, email: email };
            }
        });
    }
});
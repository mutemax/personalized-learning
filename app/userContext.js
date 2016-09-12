define(['queryStringParameters'], function (queryStringParameters) {
    var self = {
        currentUser: null
    },
        context = {
            use: use,
            initialize: initialize,
            getCurrentUser: getCurrentUser
        }
    ;

    return context;

    function getCurrentUser() {
        return self.currentUser;
    }

    function use(userInfoProvider) {
        if(!userInfoProvider) {
            return;
        }
        var accountId = userInfoProvider.getAccountId(),
            accountHomePage = userInfoProvider.getAccountHomePage(),
            username = userInfoProvider.getUsername();
        if(!accountId || !accountHomePage || !username) {
            return;
        }
        self.currentUser = {
            email: accountId,
            username: username,
            account: {
                homePage: accountHomePage,
                name: accountId
            }
        };
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
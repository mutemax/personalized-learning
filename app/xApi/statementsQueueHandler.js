define(['durandal/app', './requestsTransport/requestSender', './statementsQueue'], function (app, requestSender, statementsQueue) {

    var statementsQueueHandler = {
        handle: handle
    };

    return statementsQueueHandler;

    function handle() {
        var statement = statementsQueue.dequeue();

        if (statement) {
            return requestSender.sendStatement(statement).then(function (pr) {
                statementsQueueHandler.handle();
            });
        } else {
            var subscription = statementsQueue.statements.subscribe(function () {
                handle();
                subscription.dispose();
            });
        }
    }

});
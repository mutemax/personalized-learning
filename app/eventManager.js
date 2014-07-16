define(['durandal/app', 'Q'],
    function (app, Q) {
        "use strict";

        var
            events = {
                courseStarted: "course:started",
                courseFinished: "course:finished",
                answersSubmitted: "answer:submitted",
                learningContentExperienced: "learningContent:experienced"
            },

            turnAllEventsOff = function () {
                _.each(events, function (event) {
                    app.off(event);
                });
            },

            subscribeForEvent = function (event) {
                if (!_.contains(_.values(events), event)) {
                    throw 'Unsupported event';
                }

                return app.on(event);
            },

            courseStarted = function () {
                app.trigger(events.courseStarted);
            },

            courseFinished = function (data, callback) {
                return executeAfterSubscribersDone(events.courseFinished, data, callback);
            },

            answersSubmitted = function (data) {
                app.trigger(events.answersSubmitted, data);
            },

            learningContentExperienced = function (data) {
                app.trigger(events.learningContentExperienced, data);
            },

            executeAfterSubscribersDone = function (event, eventData, callback) {
                if (_.isUndefined(app.callbacks) || _.isUndefined(app.callbacks[event])) {
                    return Q.fcall(function () {
                        if (_.isFunction(callback)) {
                            callback();
                        }
                    });
                }

                var promises = [];
                _.each(app.callbacks[event], function (handler) {
                    if (_.isFunction(handler)) {
                        var promise = handler(eventData);

                        if (Q.isPromise(promise)) {
                            promises.push(promise);
                        }
                    }
                });

                return Q.all(promises).then(function () {
                    if (_.isFunction(callback)) {
                        callback();
                    }
                });
            };

        return {
            events: events,
            turnAllEventsOff: turnAllEventsOff,
            subscribeForEvent: subscribeForEvent,

            courseStarted: courseStarted,
            courseFinished: courseFinished,
            answersSubmitted: answersSubmitted,
            learningContentExperienced: learningContentExperienced
        };
    }
);
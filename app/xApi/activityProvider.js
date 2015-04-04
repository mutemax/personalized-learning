define(['durandal/system', 'durandal/app', './statementsQueue', './statementsQueueHandler', './configuration/settings', './entities/actor', './entities/activity', './entities/statement', './entities/result', './entities/score', './verbs', 'eventManager', 'Q'],
    function (system, app, statementsQueue, statementsQueueHandler, settingsModule, ActorModel, ActivityModel, StatementModel, ResultModel, ScoreModel, verbs, eventManager, Q) {
        "use strict";

        var subscriptions = [],
            rootCourseUrl = '';

        var activityProvider = {
            initialize: initialize,
            turnOffSubscriptions: turnOffSubscriptions,

            actor: null,
            activityName: '',
            activityUrl: '',
            courseId: null
        },
        sessionId = system.guid();

        return activityProvider;

        function initialize(courseId, actorName, actorEmail, activityName, activityUrl) {
            rootCourseUrl = activityUrl != undefined ? activityUrl.split("?")[0].split("#")[0] : '';
            // TODO: Check if undefined activity url is possible

            activityProvider.actor = createActor(actorName, actorEmail);
            activityProvider.activityName = activityName;
            activityProvider.activityUrl = activityUrl;
            activityProvider.courseId = courseId;

            subscriptions.push(eventManager.subscribeForEvent(eventManager.events.courseStarted).then(courseStartedHandler));
            subscriptions.push(eventManager.subscribeForEvent(eventManager.events.courseFinished).then(courseFinishedHandler));

            app.on('xapi:turnOff', turnOffSubscriptions);
        }

        function turnOffSubscriptions() {
            _.each(subscriptions, function (subscription) {
                subscription.off();
            });
        }

        function pushStatementIfSupported(statement) {
            var statementName = statement.verb.display[settingsModule.settings.defaultLanguage];
            if (_.contains(settingsModule.settings.xApi.allowedVerbs, statementName)) {
                statementsQueue.enqueue(statement);
            }
        }

        function createActor(name, email) {
            var actor = new ActorModel({
                name: name,
                mbox: 'mailto:' + email
            });

            return actor;
        }

        function createActivity(id, name) {
            var displayName = {};
            displayName[settingsModule.settings.defaultLanguage] = name;

            var activity = new ActivityModel({
                id: id,
                definition: { name: displayName }
            });

            return activity;
        }

        function createContext(contextSpec) {
            contextSpec = contextSpec || {};
            var contextExtensions = contextSpec.extensions || {};
            contextExtensions["http://easygenerator/expapi/course/id"] = activityProvider.courseId;
            contextSpec.extensions = contextExtensions;
            contextSpec.registration = sessionId;
            return contextSpec;
        }

        function createStatement(verb, result, activity, context) {
            var activityData = activity || createActivity(activityProvider.activityUrl, activityProvider.activityName);
            context = context || createContext();

            var statement = new StatementModel({
                actor: activityProvider.actor,
                verb: verb,
                object: activityData,
                result: result,
                context: context
            });

            return statement;
        }

        function courseStartedHandler() {
            pushStatementIfSupported(createStatement(verbs.started));
        }

        function courseFinishedHandler(course) {
            if (_.isUndefined(course)) {
                throw 'Request failed: Not enough data in the settings';
            }

            if (_.isArray(course.objectives)) {
                _.each(course.objectives, function (objective) {
                    var objectiveUrl = rootCourseUrl + '#objectives?objective_id=' + objective.id;

                    var resultData = {
                        score: new ScoreModel(objective.score() / 100)
                    };

                    var statement = createStatement(verbs.mastered, new ResultModel(resultData), createActivity(objectiveUrl, objective.title));
                    pushStatementIfSupported(statement);
                });
            }

            var courseResultData = {
                score: new ScoreModel(course.score() / 100)
            };
            var courseResult = new ResultModel(courseResultData);
            var resultVerb = course.isSuccessful() ? settingsModule.settings.scoresDistribution.positiveVerb : verbs.failed;

            pushStatementIfSupported(createStatement(resultVerb, courseResult));
            pushStatementIfSupported(createStatement(verbs.stopped));

            var dfd = Q.defer();

            statementsQueue.statements.subscribe(function (newValue) {
                if (newValue.length == 0) {
                    dfd.resolve();
                }
            });

            // (^\ x_x /^)
            statementsQueue.enqueue(undefined);

            return dfd.promise;
        }

    }
);
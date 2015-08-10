define(['durandal/app',
    'durandal/system',
    './statementsQueue',
    './statementsQueueHandler',
    './configuration/settings',
    './entities/actor',
    './entities/activity',
    './entities/statement',
    './entities/result',
    './entities/score',
    './entities/contextActivities',
    './entities/interactionDefinition',
    './entities/languageMap',
    './verbs',
    './interactionTypes',

    'eventManager',
    'constants',
    'queries/objectiveQueries',
    'Q'],
    function (app, system, statementsQueue, statementsQueueHandler, settingsModule, ActorModel, ActivityModel, StatementModel, ResultModel, ScoreModel, ContextActivitiesModel, InteractionDefinitionModel, LanguageMapModel, verbs, interactionTypes, eventManager, globalConstants, objectiveQueries, Q) {
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

            debugger

            // TODO: Check if undefined activity url is possible
            activityProvider.actor = createActor(actorName, actorEmail);
            activityProvider.activityName = activityName;
            activityProvider.activityUrl = activityUrl;
            activityProvider.courseId = courseId;

            subscriptions.push(eventManager.subscribeForEvent(eventManager.events.courseStarted).then(courseStartedHandler));
            subscriptions.push(eventManager.subscribeForEvent(eventManager.events.questionAnswered).then(questionAnsweredHandler));
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
            debugger
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

        function questionAnsweredHandler(data) {
            if (_.isUndefined(data)) {
                throw 'Request failed: Not enough data in the settings';
            }

            var objective = objectiveQueries.getByQuestionId(data.question.id);
            if (_.isUndefined(objective)) {
                throw 'Objective is not found';
            }

            var parts = getQuestionParts(data, objective);

            var parentUrl = rootCourseUrl + '#objectives?objective_id=' + objective.id;

            var context = createContext({
                contextActivities: new ContextActivitiesModel({
                    parent: [createActivity(parentUrl, objective.title)]
                })
            });

            if (parts) {
                var statement = createStatement(verbs.answered, parts.result, parts.object, context);
                if (statement) {
                    pushStatementIfSupported(statement);
                }
            }

        }

        function getQuestionParts(data, objective) {
            switch (data.question.type) {
                case globalConstants.questionTypes.multipleSelect:
                case globalConstants.questionTypes.singleSelectText:
                    return getSelectTextQuestionActivityAndResult(data.question, data.answer, objective);
                case globalConstants.questionTypes.fillInTheBlank:
                    return getFillInQuestionActivityAndResult(data.question, data.answer, objective);
                case globalConstants.questionTypes.singleSelectImage:
                    return getSingleSelectImageQuestionAcitivityAndResult(data.question, data.answer, objective);
                case globalConstants.questionTypes.statement:
                    return getStatementQuestionActivityAndResult(data.question, data.answer, objective);
                case globalConstants.questionTypes.dragAndDrop:
                    return getDragAndDropTextQuestionActivityAndResult(data.question, data.answer, objective);
                case globalConstants.questionTypes.textMatching:
                    return getMatchingQuestionActivityAndResult(data.question, data.answer, objective);
                case globalConstants.questionTypes.hotspot:
                    return getHotSpotQuestionActivityAndResult(data.question, data.answer, objective);
            }

            return null;
        }

        function getSelectTextQuestionActivityAndResult(question, answer, objective) {
            return {
                result: new ResultModel({
                    score: new ScoreModel(question.score / 100),
                    response: answer.join("[,]")
                }),
                object: new ActivityModel({
                    id: rootCourseUrl + '#objective/' + objective.id + '/question/' + question.id,
                    definition: new InteractionDefinitionModel({
                        name: new LanguageMapModel(question.title),
                        interactionType: interactionTypes.choice,
                        correctResponsesPattern: [
                            _.chain(question.answers)
                            .filter(function (item) {
                                return item.isCorrect;
                            })
                            .map(function (item) {
                                return item.id;
                            }).value().join("[,]")
                        ],
                        choices: _.map(question.answers, function (item) {
                            return {
                                id: item.id,
                                description: new LanguageMapModel(item.text)
                            };
                        })
                    })
                })
            };
        }

        function getStatementQuestionActivityAndResult(question, answer, objective) {
            return {
                result: new ResultModel({
                    score: new ScoreModel(question.score / 100),
                    response: _.map(answer, function (statement) {
                        return statement.id + '[.]' + statement.state;
                    }).join("[,]")
                }),
                object: new ActivityModel({
                    id: rootCourseUrl + '#objective/' + objective.id + '/question/' + question.id,
                    definition: new InteractionDefinitionModel({
                        name: new LanguageMapModel(question.title),
                        interactionType: interactionTypes.choice,
                        correctResponsesPattern: [
                            _.map(question.answers, function (item) {
                                return item.id + '[.]' + item.isCorrect;
                            }).join("[,]")
                        ],
                        choices: _.map(question.answers, function (item) {
                            return {
                                id: item.id,
                                description: new LanguageMapModel(item.text)
                            };
                        })
                    })
                })
            };
        }

        function getSingleSelectImageQuestionAcitivityAndResult(question, answer, objective) {

            return {
                result: new ResultModel({
                    score: new ScoreModel(question.score / 100),
                    response: answer.toString()
                }),
                object: new ActivityModel({
                    id: rootCourseUrl + '#objective/' + objective.id + '/question/' + question.id,
                    definition: new InteractionDefinitionModel({
                        name: new LanguageMapModel(question.title),
                        interactionType: interactionTypes.choice,
                        correctResponsesPattern: [question.correctAnswerId.toString()],
                        choices: _.map(question.answers, function (item) {
                            return {
                                id: item.id,
                                description: new LanguageMapModel(item.image)
                            };
                        })
                    })
                })
            };

        }

        function getFillInQuestionActivityAndResult(question, answer, objective) {
            return {
                result: new ResultModel({
                    score: new ScoreModel(question.score / 100),
                    response: _.map(answer, function (item) {
                        return item.text;
                    }).join("[,]")
                }),
                object: new ActivityModel({
                    id: rootCourseUrl + '#objective/' + objective.id + '/question/' + question.id,
                    definition: new InteractionDefinitionModel({
                        name: new LanguageMapModel(question.title),
                        interactionType: interactionTypes.fillIn,
                        correctResponsesPattern: [
                            _.flatten(_.map(question.answers, function (item) {
                                return item.text;
                            })).join("[,]")
                        ]
                    })
                })
            };
        }

        function getHotSpotQuestionActivityAndResult(question, answer, objective) {
            return {
                result: new ResultModel({
                    score: new ScoreModel(question.score / 100),
                    response: _.map(answer, function (mark) {
                        return '(' + mark.x + ',' + mark.y + ')';
                    }).join("[,]")
                }),
                object: new ActivityModel({
                    id: rootCourseUrl + '#objective/' + objective.id + '/question/' + question.id,
                    definition: new InteractionDefinitionModel({
                        name: new LanguageMapModel(question.title),
                        interactionType: interactionTypes.other,
                        correctResponsesPattern: [_.map(question.spots, function (spot) {
                            var polygonCoordinates = _.map(spot, function (spotCoordinates) {
                                return '(' + spotCoordinates.x + ',' + spotCoordinates.y + ')';
                            });
                            return polygonCoordinates.join("[.]");
                        }).join("[,]")]
                    })
                })
            }
        }

        function getDragAndDropTextQuestionActivityAndResult(question, answer, objective) {
            return {
                result: new ResultModel({
                    score: new ScoreModel(question.score / 100),
                    response: _.map(answer, function (item) {
                        return '(' + item.x + ',' + item.y + ')';
                    }).join("[,]")
                }),

                object: new ActivityModel({
                    id: rootCourseUrl + '#objective/' + objective.id + '/question/' + question.id,
                    definition: new InteractionDefinitionModel({
                        name: new LanguageMapModel(question.title),
                        interactionType: interactionTypes.other,
                        correctResponsesPattern: [_.map(question.dropspots, function (item) {
                            return '(' + item.x + ',' + item.y + ')';
                        }).join("[,]")]
                    })
                })
            }
        }

        function getMatchingQuestionActivityAndResult(question, answer, objective) {
            var formattedAnswer = _.map(question.answers, function (pair) {
                var answerPair = _.find(answer, function (a) {
                    return a.id === pair.id;
                });

                return { key: pair.key, value: answerPair && answerPair.value ? answerPair.value : '' };
            });

            return {
                result: new ResultModel({
                    score: new ScoreModel(question.score / 100),
                    response: _.map(formattedAnswer, function (item) {
                        return item.key.toLowerCase() + "[.]" + item.value.toLowerCase();
                    }).join("[,]")
                }),
                object: new ActivityModel({
                    id: rootCourseUrl + '#objective/' + objective.id + '/question/' + question.id,
                    definition: new InteractionDefinitionModel({
                        name: new LanguageMapModel(question.title),
                        interactionType: interactionTypes.matching,
                        correctResponsesPattern: [_.map(question.answers, function (item) {
                            return item.key.toLowerCase() + "[.]" + item.value.toLowerCase();
                        }).join("[,]")],
                        source: _.map(question.answers, function (item) {
                            return { id: item.key.toLowerCase(), description: new LanguageMapModel(item.key) }
                        }),
                        target: _.map(question.answers, function (item) {
                            return { id: item.value.toLowerCase(), description: new LanguageMapModel(item.value) }
                        })
                    })
                })
            };

        }
    }
);
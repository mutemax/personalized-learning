define(['knockout', 'entities/course', 'durandal/app', 'Q'], function (ko, course, app, Q) {
    "use strict";

    var viewModel = {
        learntObjectives: [],
        objectivesToLearn: [],

        finish: finish,

        activate: activate
    };

    return viewModel;

    function finish() {
        app.trigger('studying:completed');
    }

    function activate() {
        return Q.fcall(function () {
            viewModel.learntObjectives = [];
            viewModel.objectivesToLearn = [];

            var objectiveIndex;

            _.each(course.objectives, function (objective, index) {
                if (!objective.isCompleted() && _.isUndefined(objectiveIndex)) {
                    objectiveIndex = index;
                }
            });
            _.each(course.objectives, function (objective, index) {

                var objectiveViewModel = {
                    id: objective.id,
                    title: objective.title,
                    score: objective.score(),
                    startRecommendedReading: function () {
                        app.trigger('studying:start-reading', objective.id, this.id);
                    },
                    recommended: _.chain(objective.questions)
                        .filter(function (question) {
                            return question.score != 100;
                        })
                        .map(function (question) {
                            return { id: question.id, title: question.title };
                        })
                        .value(),
                    isExpanded: ko.observable(index === objectiveIndex),
                    toggleExpand: function () {
                        this.isExpanded(!this.isExpanded());
                    },

                };

                if (objectiveViewModel.recommended.length) {
                    viewModel.objectivesToLearn.push(objectiveViewModel);
                } else {
                    viewModel.learntObjectives.push(objectiveViewModel);
                }

            });
        });
    }

});
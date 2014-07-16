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

            _.each(course.objectives, function (objective) {

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
                    isExpanded: ko.observable(false),
                    expand: function () {
                        this.isExpanded(true);
                    },
                    collapse: function () {
                        this.isExpanded(false);
                    }
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
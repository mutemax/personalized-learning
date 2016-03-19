define(['knockout', 'entities/course', 'durandal/app', 'Q'], function (ko, course, app, Q) {
    "use strict";

    var viewModel = {
        learntSections: [],
        sectionsToLearn: [],

        finish: finish,

        activate: activate
    };

    return viewModel;

    function finish() {
        app.trigger('studying:completed');
    }

    function activate() {
        return Q.fcall(function () {
            viewModel.learntSections = [];
            viewModel.sectionsToLearn = [];

            var sectionIndex;

            _.each(course.sections, function (section, index) {
                if (!section.isCompleted() && _.isUndefined(sectionIndex)) {
                    sectionIndex = index;
                }

                var sectionViewModel = {
                    id: section.id,
                    title: section.title,
                    score: section.score(),
                    startRecommendedReading: function () {
                        app.trigger('studying:start-reading', section.id, this.id);
                        app.trigger('view:changed', { section: section.id, question:this.id })
                    },
                    recommended: _.chain(section.questions)
                        .filter(function (question) {
                            return question.score != 100;
                        })
                        .map(function (question) {
                            return { id: question.id, title: question.title };
                        })
                        .value(),
                    isExpanded: ko.observable(index === sectionIndex),
                    toggleExpand: function () {
                        this.isExpanded(!this.isExpanded());
                    },

                };

                if (sectionViewModel.recommended.length) {
                    viewModel.sectionsToLearn.push(sectionViewModel);
                } else {
                    viewModel.learntSections.push(sectionViewModel);
                }

            });
        });
    }

});
define(['entities/course', 'viewmodels/factory', 'durandal/app', 'Q'], function (course, factory, app, Q) {
    "use strict";

    var viewModel = {
        activate: activate,
        questions: ko.observableArray([]),
        submit: submit
    };

    viewModel.progress = ko.computed(function () {
            var value = 0;
            _.each(viewModel.questions(), function (question) {
                if (question.isDirty()) {
                    value++
                }
            })
            return(value)
    });

    return viewModel;

    function activate() {
        return Q.fcall(function () {
            _.each(course.objectives, function (objective) {
                _.each(objective.questions, function (question) {
                    viewModel.questions.push(factory.createQuestionViewModel(question));
                });
            });
        })
        ["catch"](function (reason) {
            console.error(reason);
        });
    }

    function submit() {
        _.each(viewModel.questions(), function (question) {
            question.submit();
        });

        app.trigger('preassessment:completed');
    }

})
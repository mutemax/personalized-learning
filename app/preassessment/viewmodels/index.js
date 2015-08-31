define(['entities/course', 'viewmodels/factory', 'durandal/app', 'Q', 'preassessment/helpers/alternativeHeader'], function (course, factory, app, Q, alternativeHeader) {
    "use strict";

    var viewModel = {        
        questions: ko.observableArray([]),
        submit: submit,
        answerQuestions:answerQuestions,

        activate: activate,
        attached: attached,
        detached: detached,
    };

    var self = {
        header: null
    };

    viewModel.progress = ko.computed(function () {
        var count = 0;
        _.each(viewModel.questions(), function (question) {
            if (question.isDirty()) {
                count++
            }
        })
        return count;
    });

    return viewModel;

    function attached(element) {
        self.header = alternativeHeader(element);
        if (_.isObject(self.header) && _.isFunction(self.header.subscribe)) {
            self.header.subscribe()
        }
    }

    function detached() {
        if (_.isObject(self.header) && _.isFunction(self.header.unsubscribe)) {
            self.header.unsubscribe()
        }
    }


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

    function answerQuestions() {
        _.each(viewModel.questions(), function (question) {
            question.submit();
        });
    }

    function submit() {
       app.trigger('preassessment:completed');
    }

})
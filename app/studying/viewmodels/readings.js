define(['durandal/app', 'entities/course', 'knockout', 'plugins/http', 'Q', '_', 'viewmodels/factory'], function (app, course, ko, http, Q, _, factory) {
    "use strict";

    var
        self = {
            objective: undefined
        }
    ;

    var viewmodel = {
        activate: activate,

        isReady: ko.observable(false),

        goToNextReading: goToNextReading,
        goToNextOrNotCompletedReading: goToNextOrNotCompletedReading,
        goToPreviousReading: goToPreviousReading,

        goToStudyAdvice: goToStudyAdvice,

        title: ko.observable(),
        score: ko.observable(),

        submit: submit
    };

    viewmodel.currentReading = ko.observable();
    viewmodel.currentReadingIndex = ko.observable();
    viewmodel.numberOfReadings = ko.observable();

    viewmodel.nextReading = ko.observable();
    viewmodel.nextOrNotCompletedReading = ko.observable();
    viewmodel.previousReading = ko.observable();

    return viewmodel;

    function activate(objectiveId, questionId) {
        return Q.fcall(function () {
            self.objective = getObjectiveById(objectiveId);

            viewmodel.title = self.objective.title;
            viewmodel.score(self.objective.score());

            apply(questionId);
        });

    }

    function apply(questionId) {
        viewmodel.isReady(false);
        viewmodel.currentReading(undefined);
        viewmodel.previousReading(undefined);
        viewmodel.nextReading(undefined);
        viewmodel.nextOrNotCompletedReading(undefined);

        var readings = [];
        for (var i = 0; i < self.objective.questions.length; i++) {
            if (self.objective.questions[i].score < 100 || self.objective.questions[i].isMastered==false) {
                readings.push(self.objective.questions[i]);
            }
        }

        var index, question;
        _.each(readings, function (v, i) {

            if (v.id == questionId) {
                question = v;
                index = i;
            }
        });


        var vm = factory.createQuestionViewModel(question);

        viewmodel.currentReading(vm);
        viewmodel.currentReadingIndex(index);

        viewmodel.numberOfReadings(readings.length);

        viewmodel.nextReading(readings.length > index + 1 ? readings[index + 1].id : null);
        viewmodel.previousReading(index > 0 ? readings[index - 1].id : null);


        if (viewmodel.nextReading()) {
            viewmodel.nextOrNotCompletedReading(viewmodel.nextReading());
        } else {
            if (readings.length > 1) {
                viewmodel.nextOrNotCompletedReading(readings[0].id);
            }
        }
        
        Q.allSettled([vm.learningContent.load(), vm.correctFeedback.load(), vm.incorrectFeedback.load()]).then(function () {
            setTimeout(function () {
                viewmodel.isReady(true);
            }, 200);
        });
    }

    function goToPreviousReading() {
        if (viewmodel.previousReading()) {
            apply(viewmodel.previousReading());
            app.trigger('view:changed', {
                objective: self.objective.id, question: viewmodel.currentReading().id
            });
        }
    }

    function goToNextReading() {
        if (viewmodel.nextReading()) {
            apply(viewmodel.nextReading());
            app.trigger('view:changed', {objective:self.objective.id, question:viewmodel.currentReading().id
        });
        }
    }

    function goToNextOrNotCompletedReading() {
        if (viewmodel.nextOrNotCompletedReading()) {
            apply(viewmodel.nextOrNotCompletedReading());
            app.trigger('view:changed', {
                objective: self.objective.id, question: viewmodel.currentReading().id
            });
        }
    }

    function goToStudyAdvice() {
        app.trigger('studying:stop-reading');
    }

    function submit() {        
        viewmodel.currentReading().submit();
        viewmodel.score(self.objective.score());
    }


    function getObjectiveById(objectiveId) {
        var result = null;
        _.each(course.objectives, function (objective) {
            if (objective.id == objectiveId) {
                result = objective;
            }

        });
        return result;
    }

});
define(['knockout', './Question'], function (ko, Question) {

    var ctor = function (question) {
        var that = this,
            branchTrackInstance = Branchtrack.create(question.projectId);
        Question.call(that, question);

        that.content = question.content;
        that.embedCode = ko.observable(question.embedCode);

        that.isDirty = ko.computed(function () {
            if (that.projectId) {
                return true;
            }
        });

        that.submit = function () {
            question.answer(branchTrackInstance.score);
            that.isAnswered(true);
            that.isAnsweredCorrectly(question.score == 100);
        };

        that.resetAnswer = function() {
            that.isAnswered(false);
            that.isAnsweredCorrectly(false);
            that.embedCode.valueHasMutated();
            branchTrackInstance.reset();
        };
    };

    return ctor;
})
define(['entities/Question'], function (Question) {

    var ctor = function(id, title, type, answers, correctAnswerId) {
        var that = this,
            _protected = {
                answer: answer,
                restoreProgress: restoreProgress,
                getProgress: getProgress
            };

        Question.call(that, id, title, type, _protected);

        that.answers = answers;
        that.correctAnswerId = correctAnswerId;

        function answer(answerId) {
            that.score = answerId == that.correctAnswerId ? 100 : 0;
        };
        function restoreProgress(progress) {
            _.each(that.answers, function (answer) {
                answer.isChecked = false;
                if (answer.id == progress) {
                    answer.isChecked = true;
                }
                if (progress == 100 && answer.id == that.correctAnswerId) {
                    answer.isChecked = true;
                    that.score = 100;
                }
            });

        }

        function getProgress() {
            debugger
        }
    };

    return ctor;

})
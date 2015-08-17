define(['_', 'entities/Question'], function (_, Question) {

    var ctor = function (id, title, type, answers) {
        var that = this,
            _protected = {
                answer: answer,
                restoreProgress: restoreProgress
            };

        Question.call(that, id, title, type, _protected);

        that.answers = answers;
        
        function answer(answerIds) {
            var correctAnswers = _.filter(that.answers, function (answer) {
                return answer.isCorrect === true;
            });

            var correctAnswerIds = _.map(correctAnswers, function (answer) {
                return answer.id;
            });

            if (_.difference(correctAnswerIds, answerIds).length === 0 && _.difference(answerIds, correctAnswerIds).length === 0) {
                that.score = 100;
            } else {
                that.score = answerIds;
            }
        };
        function restoreProgress(progress) {
            _.each(that.answers, function (answer) {
                answer.isChecked = false;
                if (_.find(progress, function(id) {
                    return id == answer.id;
                })) {
                    answer.isChecked = true;
                }
                if (progress == 100 && answer.isCorrect == true) {
                    answer.isChecked = true;
                    that.score = 100;
                }
            });

        }
    };

    return ctor;

})
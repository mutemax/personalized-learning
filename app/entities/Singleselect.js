define(['_', 'entities/Question'], function (_, Question) {

    var ctor = function (id, title, type, answers) {
        var that = this,
            _protected = {
                answer: answer,
                restoreProgress: restoreProgress,
                getProgress: getProgress
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
                that.score = 0;
            }
        };

        function restoreProgress(progress) {
            _.each(that.answers, function (answer) {
                if (answer.isCorrect && progress == 100) {
                    that.score = 100;
                    return answer.isChecked = true;
                    
                } else {

                }
            });
        }
        function getProgress() {
            debugger
            if (this.score == 100) {
                return 100;
            } else {
                return _.chain(that.answers)
                    .filter(function (answer) {
                        return answer.isChecked;
                    })
                    .map(function (answer) {
                        return answer.id;
                    }).value();
            }
        }
    };

    return ctor;

})
define(['_', 'entities/Question'], function (_, Question) {

    var ctor = function (id, title, type, answers) {
        var that = this,
            _protected = {
                answer: answer,
                restoreProgress: restoreProgress,
                getProgress: getProgress
            };
        var submittedAnswers = null;
        Question.call(that, id, title, type, _protected);

        that.answers = answers;

        function answer(userAnswers) {
            submittedAnswers = userAnswers;
            var numOfCorrect = 0;

            _.each(that.answers, function (option) {
                if (_.find(userAnswers, function (answer) {
                    return option.groupId.toLowerCase() == answer.groupId.toLowerCase() && option.text.toLowerCase() == answer.text.toLowerCase();
                })) {
                    numOfCorrect++;
                }
            });

            that.score = numOfCorrect == that.answers.length ? 100 : 0;
        };
        function restoreProgress(progress) {
            if (progress == 100) {
                that.score = 100;
                _.each(that.answers, function (answer) {
                    answer.submittedAnswer = answer.text;

                });
            }
            else {
                _.each(that.answers, function (answer) {
                    answer.submittedAnswer = _.find(progress, function (progressItem) {
                        return answer.groupId==progressItem.groupId
                    }).text;

                });
            }
        }

        function getProgress() {
            if (that.score == 100) {
                return 100
            }
            return submittedAnswers;
        }
    };

    return ctor;

})
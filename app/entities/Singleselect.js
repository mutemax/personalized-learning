define([], function () {

    var ctor = function (id, title, answers) {
        this.id = id;
        this.title = title;
        this.answers = answers;
        this.score = 0;

        this.answer = function (answerIds) {
            var correctAnswers = _.filter(this.answers, function (answer) {
                return answer.isCorrect === true;
            });

            var correctAnswerIds = _.map(correctAnswers, function (answer) {
                return answer.id;
            });

            if (_.difference(correctAnswerIds, answerIds).length === 0 && _.difference(answerIds, correctAnswerIds).length === 0) {
                this.score = 100;
            } else {
                this.score = 0;
            }
        };
    };

    return ctor;

})
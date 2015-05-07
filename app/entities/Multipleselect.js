define(['_', 'entities/Question'], function (_, Question) {

    var ctor = function (id, title, type, answers) {
        var that = this,
            _protected = {
                answer: answer
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
    };

    return ctor;

})
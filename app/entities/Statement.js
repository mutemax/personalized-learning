define(['_', 'entities/Question'], function (_, Question) {

    var ctor = function(id, title, type, answers) {
        var that = this,
            _protected = {
                answer: answer
            };

        Question.call(that, id, title, type, _protected);

        that.answers = answers;
        
        function answer(userAnswers) {
            that.score = _.every(that.answers, function (answer) {
                var userAnswer = _.find(userAnswers, function(statement) {
                    return answer.id == statement.id;
                });
                return answer.isCorrect === userAnswer.state;
            }) ? 100 : 0;
        };
    };

    return ctor;

});
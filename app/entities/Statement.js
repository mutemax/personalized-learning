define([], function() {

    var ctor = function(id, title, answers) {
        this.id = id;
        this.title = title;
        this.answers = answers;
        this.score = 0;

        this.answer = function (userAnswers) {
            var that = this;

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
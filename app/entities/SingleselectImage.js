define(['entities/Question'], function (Question) {

    var ctor = function(id, title, type, answers, correctAnswerId) {
        var that = this,
            _protected = {
                answer: answer
            };

        Question.call(that, id, title, type, _protected);

        that.answers = answers;
        that.correctAnswerId = correctAnswerId;

        function answer(answerId) {
            that.score = answerId == that.correctAnswerId ? 100 : 0;
        };
    };

    return ctor;

})
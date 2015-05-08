define(['_', 'entities/Question'], function (_, Question) {

    var ctor = function (id, title, type, answers) {
        var that = this,
            _protected = {
                answer: answer
            };

        Question.call(that, id, title, type, _protected);

        that.answers = answers;

        function answer(userAnswers) {
            var numOfCorrect = 0;

            _.each(that.answers, function (option) {
                if (_.find(userAnswers, function (answer) {
                    return option.groupId == answer.groupId && option.text == answer.text;
                })) {
                    numOfCorrect++;
                }
            });

            that.score = numOfCorrect == that.answers.length ? 100 : 0;
        };
    };

    return ctor;

})
define(['_', 'entities/Question'], function (_, Question) {

    var TextMatching = function (id, title, type, answers) {
        var that = this,
            _protected = {
                answer: answer,
                restoreProgress: restoreProgress
            };

        Question.call(that, id, title, type, _protected);
        that.answers = answers;

        function answer(pairs) {
            var correct = 0;
            _.each(that.answers, function (answer) {
                if (_.find(pairs, function (pair) {
                    return pair.id == answer.id && pair.value == answer.value;
                })) {
                    correct++;
                }

            });
            that.score = correct == that.answers.length ? 100 : pairs;
        }

        function restoreProgress(progress) {
            if (progress == 100) {
                _.each(that.answers, function (answer) {
                    answer.attemptedValue = answer.value;
                    that.score = 100;
                });
                return;
            }
            _.each(progress, function(progressItem, index) {
                that.answers[index].attemptedValue = progressItem.value;
            });
        }
    };

    return TextMatching;

})
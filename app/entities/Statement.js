define(['_', 'entities/Question'], function (_, Question) {

    var ctor = function(id, title, type, answers) {
        var that = this,
            _protected = {
                answer: answer,
                restoreProgress: restoreProgress
            };

        Question.call(that, id, title, type, _protected);

        that.answers = answers;
        
        function answer(userAnswers) {
            that.score = _.every(that.answers, function (answer) {
                var userAnswer = _.find(userAnswers, function(statement) {
                    return answer.id == statement.id;
                });
                return answer.isCorrect === userAnswer.state;
            }) ? 100 : userAnswers;
        };
        function restoreProgress(progress) {
            _.each(that.answers, function(answer) {
                answer.isChecked = null;
                if(progress!=100){
                    var progressValue = _.find(progress, function(progressItem) {
                        return progressItem.id == answer.id;
                    });
                    answer.isChecked = progressValue.state;
                }
                if (progress == 100) {
                    answer.isChecked = answer.isCorrect;
                    that.score = 100;
                }
            });

        }
    };

    return ctor;

});
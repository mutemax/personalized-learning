define(['knockout', './Question'], function (ko, Question) {

    var ctor = function (question) {
        var that = this;

        Question.call(that, question);

        that.content = question.content;

        that.blanks = _.chain(question.answers)
            .map(function (option) {

                var obj = {
                    groupId: option.groupId,
                    text: ko.observable()
                }
                if (option.submittedAnswer && option.submittedAnswer.length) {
                    obj.text(option.submittedAnswer);
                    that.isAnswered(true);
                    that.isAnsweredCorrectly(question.score == 100);
                }
                return obj
            }).value();
        that.isDirty = ko.computed(function () {
            var count = 0;
            _.each(that.blanks, function (blank) {
                if (blank.text() && blank.text().length) {
                    count++
                }
            })
            return count == question.answers.length;
        });
        that.resetAnswer = function () {
            that.isAnswered(false);
            that.isAnsweredCorrectly(false);
            _.each(that.blanks, function (blank) {
                blank.text(undefined);
            });

        }

        that.submit = function (preventSendingParentProgress) {
            question.answer(preventSendingParentProgress, _.map(that.blanks, function (blank) {
                return {
                    groupId: ko.unwrap(blank.groupId),
                    text: ko.unwrap(blank.text) || ''
                }
            }));

            that.isAnswered(true);
            that.isAnsweredCorrectly(question.score == 100);
        };
    };

    return ctor;
})
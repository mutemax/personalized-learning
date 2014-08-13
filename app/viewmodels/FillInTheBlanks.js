define(['knockout', './Question'], function (ko, Question) {

    var ctor = function (question) {
        var that = this;

        Question.call(that, question);

        that.content = question.content;
        that.blanks = _.chain(question.answers)
            .map(function (option) {
                return {
                    groupId: option.groupId,
                    text: ko.observable()
                }
            }).value();

        that.resetAnswer = function () {
            that.isAnswered(false);
            that.isAnsweredCorrectly(false);

        }

        that.submit = function () {
            question.answer(_.map(that.blanks, function (blank) {
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
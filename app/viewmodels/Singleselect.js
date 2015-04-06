define(['./Question'], function (Question) {

    var ctor = function (question) {
        var that = this;

        Question.call(that, question);

        that.content = question.content;
        that.selectedOption = ko.observable();
        that.isDirty = ko.observable(false);
        that.selectOption = function (option) {
            if (that.isAnswered()) {
                return;
            }
            that.selectedOption(option);
            that.isDirty(true);
        };
        that.options = _.chain(question.answers)
            .sample(question.answers.length)
            .map(function (option) {
                return {
                    id: option.id,
                    text: option.text
                }
            }).value();

        that.resetAnswer = function () {
            that.isAnswered(false);
            that.isAnsweredCorrectly(false);
            that.selectedOption(undefined);
        }

        that.submit = function () {
            question.answer([that.selectedOption() ? that.selectedOption().id : undefined]);
            that.isAnswered(true);
            that.isAnsweredCorrectly(question.score == 100);
        };
    };

    return ctor;
})
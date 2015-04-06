define(['./Question'], function (Question) {

    var ctor = function (question) {

        var that = this;

        Question.call(that, question);

        that.id = question.id;
        that.title = question.title;
        that.content = question.content;
       
        that.options = _.chain(question.answers)
            .sample(question.answers.length)
            .map(function (option) {
                return {
                    id: option.id,
                    text: option.text,
                    checked: ko.observable(false),
                    toggleCheck: function () {
                        if (that.isAnswered()) {
                            return;
                        }
                        this.checked(!this.checked());
                    }
                }
            }).value();
        that.isDirty = ko.computed(function () {
            var value = 0;
            _.each(that.options, function (statement) {
                if (statement.checked()) {
                    value++
                }
            });
            return value > 0;
        });
        that.resetAnswer = function () {
            that.isAnswered(false);
            that.isAnsweredCorrectly(false);
            _.each(that.options, function(option) {
                option.checked(false);
            });
        }

        that.submit = function () {
            question.answer(_.chain(that.options)
                .filter(function (answer) {
                    return answer.checked();
                })
                .map(function (answer) {
                    return answer.id;
                }).value());

            that.isAnswered(true);
            that.isAnsweredCorrectly(question.score == 100);
        };
    };

    return ctor;
})
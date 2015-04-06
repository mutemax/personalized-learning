define(['./Question'], function (Question) {

    var ctor = function (question) {
        var that = this;

        Question.call(that, question);

        that.id = question.id;
        that.title = question.title;
        that.content = question.content;
        that.statements = _.chain(question.answers)
            .sample(question.answers.length)
            .map(function (statement) {
                return {
                    id: statement.id,
                    text: statement.text,
                    isChecked:ko.observable(false),
                    state: ko.observable(null),
                    markAsTrue: function () {
                        if (that.isAnswered()) {
                            return;
                        }
                        this.state(true);
                        this.isChecked(true);
                     },
                    markAsFalse: function () {
                        if (that.isAnswered()) {
                            return;
                        }
                        this.state(false);
                        this.isChecked(true);
                    }
                };
            }).value();
        that.isDirty = ko.computed(function () {
            var value = 0;
            _.each(that.statements, function (statement) {
                if (statement.isChecked()) { value++ }
            })
            return value == question.answers.length;
        })
         that.resetAnswer = function () {
            that.isAnswered(false);
            that.isAnsweredCorrectly(false);
            _.each(that.statements, function (statement) {
                statement.state(null);
            });
        };

        that.submit = function () {
            question.answer(
                _.map(that.statements, function (statement) {
                    return {
                        id: statement.id,
                        state: statement.state()
                    };
                })
            );

            that.isAnswered(true);
            that.isAnsweredCorrectly(question.score == 100);
        };
    };

    return ctor;
});
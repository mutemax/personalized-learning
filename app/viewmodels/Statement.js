define(['./Question'], function(Question) {

    var ctor = function(question) {
        var that = this;

        Question.call(that, question);

        that.id = question.id;
        that.title = question.title;
        that.content = question.content;
        that.options = _.chain(question.answers)
            .sample(question.answers.length)
            .map(function(option) {
                return {
                    id: option.id,
                    text: option.text,
                    state: ko.observable(null),
                    markAsTrue: function() {
                        if (that.isAnswered()) {
                            return;
                        }
                        this.state(true);
                    },
                    markAsFalse: function () {
                        if (that.isAnswered()) {
                            return;
                        }
                        this.state(false);
                    }
                };
            }).value();

        that.resetAnswer = function() {
            that.isAnswered(false);
            that.isAnsweredCorrectly(false);
            _.each(that.options, function(option) {
                option.state(null);
            });
        };

        that.submit = function() {
            question.answer(that.options);

            that.isAnswered(true);
            that.isAnsweredCorrectly(question.score == 100);
        };
    };

    return ctor;
});
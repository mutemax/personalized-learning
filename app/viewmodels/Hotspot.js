define(['./Question'], function (Question) {

    var ctor = function (question) {
        var that = this;

        Question.call(that, question);

        that.id = question.id;
        that.title = question.title;
        that.content = question.content;        
        that.background = question.background;

        that.submit = function () {
            question.answer();

            that.isAnswered(true);
            that.isAnsweredCorrectly(question.score == 100);
        };

        that.resetAnswer = function () {
            that.isAnswered(false);
            that.isAnsweredCorrectly(false);
            _.each(that.dropspots, function (dropspot) {
                dropspot.text(undefined);
            });
        }

    };

    return ctor;
})
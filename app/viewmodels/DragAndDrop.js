define(['./Question'], function (Question) {

    var ctor = function (question) {
        var that = this;

        Question.call(that, question);

        that.id = question.id;
        that.title = question.title;
        that.content = null;

        that.background = question.background;
        that.dropspots = _.map(question.dropspots, function (dropspot) {
            return {
                x: dropspot.x,
                y: dropspot.y,
                text: ko.observable()
            }
        });
        that.texts = _.map(question.dropspots, function (dropspot) {
            return {
                id: dropspot.id,
                text: dropspot.text
            };
        });

        that.submit = function () {


            var answer = [];

            _.each(that.dropspots, function (dropspot) {
                var text = dropspot.text();
                if (text) {
                    answer.push({
                        id: text.id,
                        x: dropspot.x,
                        y: dropspot.y
                    });
                }

            });

            question.answer(answer);

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
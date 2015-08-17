define(['_', 'entities/Question'], function (_, Question) {

    var ctor = function (id, title, type, background, dropspots) {
        var that = this,
            _protected = {
                answer: answer,
                restoreProgress: restoreProgress,
                getProgress: getProgress
            };

        Question.call(that, id, title, type, _protected);

        that.background = background;
        that.dropspots = dropspots;



        function answer(answers) {
            var correct = 0;

            _.each(answers, function (answer) {
                if (_.find(that.dropspots, function (dropspot) {
                    return dropspot.id == answer.id && dropspot.x == answer.x && dropspot.y == answer.y;
                })) {
                    correct++;
                };
            });

            that.score = correct == that.dropspots.length ? 100 : 0;
        };
        function restoreProgress(progress) {
            if (progress == 100) {
                that.score = 100;
                _.each(that.dropspots, function (dropspot) {
                    dropspot.submittedAnswer = null;
                    debugger

                })

            } else {

            }

        }
        function getProgress() {
            debugger
        }
    };

    return ctor;
})
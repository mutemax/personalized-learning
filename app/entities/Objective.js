define([], function () {
    "use strict";

    var ctor = function (id, title) {
        this.id = id;
        this.title = title;
        this.questions = [];

        this.score = function () {
            var sum = _.reduce(this.questions, function (memo, question) {
                return memo + question.score;
            }, 0);
            return Math.ceil(sum / this.questions.length);
        };

        this.isCompleted = function () {
            return this.score() >= 100;
        };
    };

    return ctor;

});
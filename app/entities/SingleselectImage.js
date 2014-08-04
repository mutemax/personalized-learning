define([], function () {

    var ctor = function (id, title, answers, correctAnswerId) {
        this.id = id;
        this.title = title;
        this.answers = answers;
        this.score = 0;

        this.answer = function (answerId) {
            this.score = answerId == correctAnswerId ? 100 : 0;
        };
    };

    return ctor;

})
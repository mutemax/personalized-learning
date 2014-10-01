define([], function () {

    var ctor = function (id, title, background, spots) {
        this.id = id;
        this.title = title;

        this.background = background;
        this.spots = spots;
        this.score = 0;

        this.answer = function (marks) {
            if (marks.length > 1) {
                this.score = 100;
            } else {
                this.score = 0;
            }

        };
    };

    return ctor;
})
define([], function () {

    var ctor = function (id, title, background, spots) {
        this.id = id;
        this.title = title;

        this.background = background;
        this.spots = spots;
        this.score = 0;

        this.answer = function (points) {
            this.score = 100;
        };
    };

    return ctor;
})
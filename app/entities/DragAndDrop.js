define([], function () {

    var ctor = function (id, title, background, dropspots) {
        this.id = id;
        this.title = title;

        this.background = background;
        this.dropspots = dropspots;
        this.score = 0;

        this.answer = function (answers) {
            var correct = 0;

            var that = this;
            _.each(answers, function (answer) {
                if (_.find(that.dropspots, function (dropspot) {
                    return dropspot.id == answer.id && dropspot.x == answer.x && dropspot.y == answer.y;
                })) {
                    correct++;
                };
            });

            this.score = correct == this.dropspots.length ? 100 : 0;
        };
    };

    return ctor;
})
define([], function () {

    var TextMatching = function (id, title, answers) {
        this.id = id;
        this.title = title;
        this.answers = answers;

        this.score = 0;

        this.answer = function (pairs) {
            var correct = 0;
            _.each(this.answers, function (answer) {
                if (_.find(pairs, function (pair) {
                    return pair.id == answer.id && pair.value == answer.value;
                })) {
                    correct++;
                }

            });
            this.score = correct == this.answers.length ? 100 : 0;
        }
    };

    return TextMatching;

})
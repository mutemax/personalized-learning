define(['./Question'], function (Question) {

    var ctor = function (question) {

        Question.call(this, question);

        var
            that = this,
            values = _.chain(question.answers)
                .map(function (answer) {
                    return answer.value;
                })
                .shuffle()
                .value()
        ;

        that.content = question.content;
        that.sources = ko.observableArray(_.map(question.answers, function (answer) {
            return new Source(answer.id, answer.key);
        }));
        that.targets = ko.observableArray(_.map(values, function (value) {
            return new Target(value);
        }));
        that.isDirty = ko.computed(function () {
            var value = 0;
            _.each(that.targets(), function (blank) {
                if (!blank.value()) {
                    value++
                }
            })
            return value == question.answers.length;
        });




        that.resetAnswer = function () {
            that.isAnswered(false);
            that.isAnsweredCorrectly(false);

            var i = 0, l = question.answers.length;
            for (; i < l; i++) {
                that.sources()[i].rejectValue();
                that.targets()[i].acceptValue(values[i]);
            }
        }

        that.submit = function () {
            question.answer(_.map(that.sources(), function (source) {
                return { id: source.id, value: ko.unwrap(source.value) };
            }));
            that.isAnswered(true);
            that.isAnsweredCorrectly(question.score == 100);
        };

    };


    return ctor;

    function Source(id, key) {
        this.id = id;
        this.key = key;
        this.value = ko.observable();

        this.acceptValue = function (value) {
            this.value(value);
        }
        this.rejectValue = function () {
            this.value(null);
        }
    }

    function Target(value) {
        this.value = ko.observable(value);
        this.acceptValue = function (value) {
            this.value(value);
        }
        this.rejectValue = function () {
            this.value(null);
        }
    }
})
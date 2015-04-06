define(['./Question'], function (Question) {

    var ctor = function (question) {
        var that = this;

        Question.call(that, question);

        that.id = question.id;
        that.title = question.title;
        that.content = question.content;
        that.background = question.background;
        that.isMultiple = question.isMultiple;
        that.isDirty = ko.observable(false);

        that.submit = function () {
            question.answer(that.marks());

            that.isAnswered(true);
            that.isAnsweredCorrectly(question.score == 100);
        };

        that.marks = ko.observableArray([]);
        that.addMark = function (mark) {
            if (!question.isMultiple) {
                that.marks.removeAll();
            }
            that.marks.push(mark);
            that.isDirty(true);
        }

        that.removeMark = function (mark) {
            that.marks.remove(mark);
        }

        that.resetAnswer = function () {
            that.isAnswered(false);
            that.isAnsweredCorrectly(false);
            that.marks.removeAll();
        }

    };

    return ctor;
})
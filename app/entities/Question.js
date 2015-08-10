define(['eventManager'], function (eventManager) {
    "use strict";
    var index = 0;

    var ctor = function (id, title, type, _protected) {
        var that = this;
        that.shortId = index++;
        that.id = id;
        that.title = title;
        that.type = type;
        that.score = 0;

        that.answer = function () {
            _protected.answer.apply(that, arguments);
            eventManager.questionAnswered({
                question: that,
                answer: arguments[0]
            });

        }

        that.restoreAnswer = function () {


        }
    }

    return ctor;
});
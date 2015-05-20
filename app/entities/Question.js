define(['eventManager'], function (eventManager) {
    "use strict";

    var ctor = function (id, title, type, _protected) {
        var that = this;
        that.id = id;
        that.title = title;
        that.type = type;
        that.score = 0;

        that.answer = function() {
            _protected.answer.apply(that, arguments);
            eventManager.questionAnswered({
                question: that,
                answer: arguments[0]
            });
        }
    }

    return ctor;
});
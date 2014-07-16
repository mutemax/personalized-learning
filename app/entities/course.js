define(['eventManager', 'Q'], function (eventManager, Q) {
    "use strict";

    var course = {
        score: score,
        finish: finish,
        isCompleted: false,
        isSuccessful: isSuccessful,

        objectives: [],
        title: '',
        id: ''
    };

    return course;

    function score() {
        var totalPercents = _.reduce(course.objectives, function (memo, objective) {
            return memo + objective.score();
        }, 0);
        return Math.ceil(totalPercents / course.objectives.length);
    }

    function finish() {
        course.isCompleted = course.isSuccessful();
        course.result = course.score() / 100;
        return Q.fcall(function () {
            return eventManager.courseFinished(course, function () {
                eventManager.turnAllEventsOff();
            });
        });
    }

    function isSuccessful() {
        return !_.some(course.objectives, function (objective) {
            return !objective.isCompleted();
        });
    }
});
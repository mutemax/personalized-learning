define(['eventManager', 'Q', 'constants'], function (eventManager, Q, constants) {
    "use strict";

    var course = {
        score: score,
        finish: finish,
        isCompleted: false,
        isFinished: false,
        isSuccessful: isSuccessful,
        getStatus: getStatus,

        objectives: [],
        title: '',
        id: '',
        createdOn: undefined
    };

    return course;

    function score() {
        var totalPercents = _.reduce(course.objectives, function (memo, objective) {
            return memo + objective.score();
        }, 0);
        return Math.ceil(totalPercents / course.objectives.length);
    }

    function finish() {
        course.isFinished = true;
        course.isCompleted = course.isSuccessful();
        course.result = course.score() / 100;
        return Q.fcall(function () {
            return eventManager.courseFinished(course, function () {
                eventManager.turnAllEventsOff();
            });
        });
    }

    function getStatus() {
        if (!course.isFinished) {
            return constants.course.statuses.inProgress;
        }

        return course.isCompleted ? constants.course.statuses.completed : constants.course.statuses.failed;
    }

    function isSuccessful() {
        return !_.some(course.objectives, function (objective) {
            return !objective.isCompleted();
        });
    }
});
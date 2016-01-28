define(['entities/course', 'constants', 'eventManager'], function (course, constants, eventManager) {
    return {
        initialize: initialize,
        saveResult: saveResult
    };

    function initialize() {
        return Q.fcall(function () {
            eventManager.subscribeForEvent(eventManager.events.courseFinished).then(saveResult);
        });
    }

    function saveResult() {
        var resultKey = constants.localStorageResultKey + course.id;
        var result = {
            score: course.score(),
            status: course.getStatus()
        };

        try {
            var string = JSON.stringify(result);
            localStorage.setItem(resultKey, string);
            return true;
        } catch (e) {
            console.log('Failed to store course result');
            return false;
        }
    }

});
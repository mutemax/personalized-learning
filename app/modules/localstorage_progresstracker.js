define(['entities/course', 'durandal/app', 'constants', 'translation'], function (course, app, constants, translation) {
    var progressKey = constants.localStorageProgressKey + course.id + course.templateId,
        resultKey = constants.localStorageResultKey + course.id + course.templateId,
        errorCatched = false;



    var module = {
        initialize: initialize,

        progressProvider: {
            getProgress: getProgress,
            saveProgress: saveProgress,
            removeProgress: removeProgress
        }
    }

    return module;

    function initialize() {

    }

    function getProgress() {

        var progress = {};
        try {
            progress = JSON.parse(localStorage.getItem(progressKey));
        } catch (e) {
            console.log('Unable to restore progress from localStorage');
        }
        return progress;
    }

    function saveProgress(progress) {


        var result = {
            score: course.score(),
            status: course.getStatus()
        };
        try {
            localStorage.setItem(resultKey, JSON.stringify(result));
            localStorage.setItem(progressKey, JSON.stringify(progress));
        } catch (e) {

            app.trigger("progress:error");
            if (!errorCatched) {
                alert(translation.getTextByKey('[not enough memory to save progress]'));
            }
            errorCatched = true;
        }

        return true;

    }

    function removeProgress() {
        try {
            localStorage.removeItem(progressKey);
        } catch (e) {
            console.log('Unable to remove progress from localStorage');
        }
        return true;
    }
})
define(['entities/course', 'constants', 'translation'], function (course, constants, translation) {
    var progressKey = constants.localStorageProgressKey + course.id + course.createdOn,
        resultKey = constants.localStorageResultKey + course.id + course.createdOn;
    
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
            alert(translation.getTextByKey('[not enough memory to save progress]'));
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
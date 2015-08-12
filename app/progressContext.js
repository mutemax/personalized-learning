define(['durandal/system', 'durandal/app', 'translation', 'eventManager', 'entities/course'], function (system, app, translation, eventManager, course) {
    var
       self = {
           storage: null,
           progress: {
               _v: 1,
               answers: {},
               url: null,
               user: null,
               attemptId: system.guid()
           }
       },
       context = {
           save: save,
           get: get,
           remove: remove,


           use: use,
           ready: ready,
           isDirty: null
       }
    ;

    return context;


    function setProgressDirty(isDirty) {
        context.isDirty = isDirty;
        app.trigger('progressContext:dirty:changed', isDirty);
    }

    function markAsDirty() {
        setProgressDirty(true);
    }

    function navigated() {

    }

    function authenticated(user) {
        self.progress.user = user;
        save();
    }

    function authenticationSkipped() {
        self.progress.user = 0;
        save();
    }

    function questionAnswered(question) {
        try {
            self.progress.answers[question.question.shortId] = question.question.score;
            setProgressDirty(true);
            save();
        } catch (e) {
            console.error(e);
        }
    }

    function finish() {
        save();
        context.isDirty = false;
    }


    function save(url) {

        if (!self.storage) {
            return;
        }
        if (url && _.isObject(self.progress)) {
            self.progress.url = url;
            self.storage.saveProgress(self.progress);
        }
        if (self.storage.saveProgress(self.progress)) {
            self.storage.saveProgress(self.progress);
        } else {
            alert(translation.getTextByKey('[course progress cannot be saved]'));
        }
    }

    function saveCurrentQuestion(objectiveId, questionId) {
        if (self.progress) {
            if (objectiveId && questionId) {
                self.progress.url = {
                    objective: objectiveId,
                    question: questionId
                }
            }
            save();
        }
        return;
    }


    function remove() {
        if (!self.storage) {
            return;
        }
        if (_.isFunction(self.storage.removeProgress)) {
            self.storage.removeProgress();
        }
    }

    function use(storage) {
        if (_.isFunction(storage.getProgress) && _.isFunction(storage.saveProgress)) {
            self.progress._v = course.createdOn.getTime();
            self.storage = storage;

            var progress = storage.getProgress();
            if (!_.isEmpty(progress) && _.isString(progress.attemptId) && progress._v === self.progress._v) {
                self.progress = progress;
            }

            eventManager.subscribeForEvent(eventManager.events.questionAnswered).then(questionAnswered).then(markAsDirty);
            eventManager.subscribeForEvent(eventManager.events.courseFinished).then(finish);
            app.on('xApi:authenticated').then(authenticated).then(markAsDirty);
            app.on('xApi:authentication-skipped').then(authenticationSkipped).then(markAsDirty);

            app.on('introduction:completed').then(navigated).then(markAsDirty);
            app.on('preassessment:completed').then(navigated).then(markAsDirty);
            app.on('studying:completed').then(navigated).then(markAsDirty);
            app.on('view:changed').then(save);
            app.on('studying:start-reading').then(saveCurrentQuestion);
        
            window.onbeforeunload = function () {
                if (context.isDirty === true) {
                    return translation.getTextByKey('[progress not saved]');
                }
            };

            setProgressDirty(false);

        } else {
            throw 'Cannot use this storage';
        }
    }

    function get() {
        return self.progress;
    }

    function ready() {

        return !!self.storage;
    }
});
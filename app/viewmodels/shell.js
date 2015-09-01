define(['knockout', 'durandal/app', 'controller', 'loader', 'templateSettings', 'background', 'entities/course', 'modulesInitializer', 'progressContext', 'translation'], function (ko, app, controller, loader, templateSettings, background, course, modulesInitializer, progressContext, translation) {
    "use strict";

    var viewModel = {
        title: course.title,
        moduleToInitialize: ko.observable(),
        activate: activate,
        logoUrl: ko.observable(),
        closeCourseDropdownVisibility: controller.inProgress,
        progressError:ko.observable(false),
        finishPopupVisibility: ko.observable(false),
        openFinishPopup: openFinishPopup,
        closeFinishPopup: closeFinishPopup,
        finish: finish,
        close: close,
        isClosed: ko.observable(false),

        activeItem: controller.activeItem,
        compositionComplete: compositionComplete
    };

    viewModel.hasLogo = ko.computed(function () {
        return !_.isEmpty(viewModel.logoUrl());
    });

   

    return viewModel;

    function activate() {
        return modulesInitializer.init().then(function () {
            viewModel.logoUrl(templateSettings.logoUrl ? templateSettings.logoUrl : '');
            if (progressContext.ready()) {

                app.on('progress:error').then(showProgressError);
                var progress = progressContext.get();

                if (_.isObject(progress)) {
                    if (_.isObject(progress.answers)) {
                        _.each(course.objectives, function (objective) {
                            _.each(objective.questions, function (question) {
                                if (!_.isNull(progress.answers[question.shortId]) && !_.isUndefined(progress.answers[question.shortId])) {
                                    question.progress(progress.answers[question.shortId], progress.url);
                                }
                            });
                        });
                    }
                }
            }
            return controller.activate();
        });
    }

    function compositionComplete() {
        background.apply(templateSettings.background);
    }

    function openFinishPopup() {
        viewModel.finishPopupVisibility(true);
    }
    function closeFinishPopup() {
        viewModel.finishPopupVisibility(false);
    }
    function close() {
        window.close();
        _.delay(function () {
            viewModel.isClosed(true),
            window.alert(translation.getTextByKey('[thank you message]'));
        }, 100);
    }
    function finish() {
        controller.finish();
    }

    function showProgressError() {
        viewModel.progressError(true);
    }
});
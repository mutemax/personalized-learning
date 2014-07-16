define(['knockout', 'controller', 'loader', 'courseSettingsModule', 'entities/course', 'modulesInitializer'], function (ko, controller, loader, courseSettingsModule, course, modulesInitializer) {
    "use strict";

    var viewModel = {
        title: course.title,
        moduleToInitialize: ko.observable(),
        activate: activate,
        logoUrl: ko.observable(),

        activeItem: controller.activeItem
    };


    viewModel.hasLogo = ko.computed(function() {
        return !_.isEmpty(viewModel.logoUrl());
    });

    return viewModel;

    function activate() {
        return modulesInitializer.init().then(function() {
            viewModel.logoUrl(courseSettingsModule.courseSettings.logo.url ? courseSettingsModule.courseSettings.logo.url : '');
            return controller.activate();
        });
    }

});
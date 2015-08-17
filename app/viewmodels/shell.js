define(['knockout', 'controller', 'loader', 'templateSettings', 'background', 'entities/course', 'modulesInitializer'], function (ko, controller, loader, templateSettings, background, course, modulesInitializer) {
    "use strict";

    var viewModel = {
        title: course.title,
        moduleToInitialize: ko.observable(),
        activate: activate,
        logoUrl: ko.observable(),

        activeItem: controller.activeItem,
        compositionComplete: compositionComplete
    };


    viewModel.hasLogo = ko.computed(function() {
        return !_.isEmpty(viewModel.logoUrl());
    });

    return viewModel;

    function activate() {
        return modulesInitializer.init().then(function () {

            viewModel.logoUrl(templateSettings.logoUrl ? templateSettings.logoUrl : '');

            return controller.activate();

           
        });
    }

    function compositionComplete() {
        background.apply(templateSettings.background);

    }

});
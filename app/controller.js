define(['durandal/app', 'durandal/activator', 'knockout', 'loader', 'templateSettings', 'entities/course', 'xApi/activityProvider'], function (app, activator, ko, loader, templateSettings, course, activityProvider) {
    "use strict";

    var self = {
        lifecycle: ['preassessment/viewmodels/index', 'studying/viewmodels/index', 'summary/viewmodels/index']
    };

    var controller = {
        activate: activate
    };

    controller.activeItem = ko.observable();
    controller.activeItem.isComposing = ko.observable(true);

    controller.activeItem.compositionComplete = function () {
        controller.activeItem.isComposing(false);
    };

    return controller;

    function activate() {

        if (course.content) {
            self.lifecycle.unshift('introduction/viewmodels/index');
        }
        debugger
        if (templateSettings.xApi && templateSettings.xApi.enabled && !activityProvider.actor ) {
            self.lifecycle.unshift('xApi/viewmodels/login');
        }
        app.on('xApi:authenticated').then(loadModuleAndActivate);
        app.on('xApi:authentication-skipped').then(loadModuleAndActivate);
        app.on('introduction:completed').then(loadModuleAndActivate);
        app.on('preassessment:completed').then(loadModuleAndActivate);
        app.on('studying:completed').then(loadModuleAndActivate);

        return loadModuleAndActivate();
    }

    function loadModuleAndActivate() {
        controller.activeItem.isComposing(true);

        var path = self.lifecycle.shift();
        return loader.loadModule(path).then(function (module) {
            controller.activeItem(module);
        });
    }

});
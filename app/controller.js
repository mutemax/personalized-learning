define(['durandal/app', 'durandal/activator', 'knockout', 'loader', 'templateSettings', 'entities/course', 'xApi/activityProvider', 'progressContext'], function (app, activator, ko, loader, templateSettings, course, activityProvider, progressContext) {
    "use strict";

    var self = {
        lifecycle: ['preassessment/viewmodels/index', 'studying/viewmodels/index', 'summary/viewmodels/index']
    };
    
    var controller = {
        activate: activate,

    };

    controller.activeItem = ko.observable();
    controller.activeItem.isComposing = ko.observable(true);

    controller.activeItem.compositionComplete = function () {
        controller.activeItem.isComposing(false);
    };

    return controller;

    function activate() {

        var progress = progressContext.get();
        if (course.content) {
            self.lifecycle.unshift('introduction/viewmodels/index');
        }
        if (templateSettings.xApi && templateSettings.xApi.enabled && !activityProvider.actor) {
            self.lifecycle.unshift('xApi/viewmodels/login');
        }

        if (_.isObject(progress) && progress.url) {
            
            var index = _.indexOf(self.lifecycle, progress.url) + 1;
            self.lifecycle = _.rest(self.lifecycle, index);
        }

        app.on('xApi:authenticated').then(loadModuleAndActivate);
        app.on('xApi:authentication-skipped').then(loadModuleAndActivate);
        app.on('introduction:completed').then(loadModuleAndActivate).then(saveMasteredView);
        app.on('preassessment:completed').then(loadModuleAndActivate).then(saveMasteredView);
        app.on('studying:completed').then(loadModuleAndActivate).then(saveMasteredView);

        return loadModuleAndActivate();
    }

    function loadModuleAndActivate() {

        controller.activeItem.isComposing(true);

        var path = self.lifecycle.shift();
        return loader.loadModule(path).then(function (module) {
            controller.activeItem(module);
        });
    }

    function saveMasteredView() {
        var url = controller.activeItem().__moduleId__;
        app.trigger('view:changed', url);
    }

});
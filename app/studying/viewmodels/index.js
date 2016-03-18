define(['knockout', 'durandal/app', 'durandal/activator', './studyadvice', './readings'], function (ko, app, activator, studyadvice, readings) {
    "use strict";

    var viewModel = {

        activeItem: activator.create(),

        activate: activate
    };


    app.on('studying:start-reading').then(function (sectionId, questionId) {
        viewModel.activeItem.activateItem(readings, [sectionId, questionId]);
    });

    app.on('studying:stop-reading').then(function () {
        viewModel.activeItem.activateItem(studyadvice);
    });

    return viewModel;

    function activate(sectionId, questionId) {
        if (sectionId && questionId) {
            viewModel.activeItem.activateItem(readings, [sectionId, questionId]);
        }
        else {
            return viewModel.activeItem.activateItem(studyadvice);
        }


    }


});
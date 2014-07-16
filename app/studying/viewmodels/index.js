define(['knockout', 'durandal/app', 'durandal/activator', './studyadvice', './readings'], function (ko, app, activator, studyadvice, readings) {
    "use strict";

    var viewModel = {

        activeItem: activator.create(),

        activate: activate
    };


    app.on('studying:start-reading').then(function (objectiveId, questionId) {
        viewModel.activeItem.activateItem(readings, [objectiveId, questionId]);
    });

    app.on('studying:stop-reading').then(function () {
        viewModel.activeItem.activateItem(studyadvice);
    });

    return viewModel;

    function activate() {
        return viewModel.activeItem.activateItem(studyadvice);
    }


});
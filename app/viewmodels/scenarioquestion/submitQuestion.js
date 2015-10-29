define(['knockout', '_'], function (ko, _) {
    'use strict';

    var submitCallback = function() {},
        branchtrackInstance = null;

    var viewmodel = {
        submit: submit,
        canBeSubmitted: ko.observable(false),
        activate: activate
    };

    return viewmodel;

    function activate(activationData) {
        branchtrackInstance = activationData.customSumbitData.branchtrackInstance;
        if (_.isFunction(activationData.submit)) {
            submitCallback = activationData.submit;
            viewmodel.canBeSubmitted(branchtrackInstance.isFinished);
        }
        
    }

    function submit() {
        viewmodel.canBeSubmitted(branchtrackInstance.isFinished);
        if (viewmodel.canBeSubmitted()) {
            submitCallback();
        }
    }
});
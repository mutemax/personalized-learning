define(function () {
    'use strict';

    return {
        questionTypes: {
            multipleSelect: 'multipleSelect',
            fillInTheBlank: 'fillInTheBlank',
            dragAndDrop: 'dragAndDropText',
            singleSelectText: 'singleSelectText',
            singleSelectImage: 'singleSelectImage',
            textMatching: 'textMatching',
            hotspot: 'hotspot',
            statement: 'statement',
            scenario: 'scenario'
        },
        course: {
            statuses: {
                completed: 'completed',
                failed: 'failed',
                inProgress: 'inProgress'
            }
        },
        localStorageResultKey: 'course_result',
        localStorageProgressKey: 'course_progress',
        views: {
            introduction: 'introduction/viewmodels/index',
            preassessment: 'preassessment/viewmodels/index',
            studyAdvice: 'studyAdvice/viewmodels/index',
            overallProgress: 'overallProgress/viewmodels/index',
            question:'question'
        }


    };

});
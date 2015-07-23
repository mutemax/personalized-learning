define(function () {
    "use strict";

    return {
        questionTypes: {
            multipleSelect: "multipleSelect",
            fillInTheBlank: "fillInTheBlank",
            dragAndDrop: "dragAndDropText",
            singleSelectText: "singleSelectText",
            singleSelectImage: "singleSelectImage",
            textMatching: "textMatching",
            hotspot: "hotspot",
            statement: "statement"
        },
        course: {
            statuses: {
                completed: 'completed',
                failed: 'failed',
                inProgress: 'inProgress'
            }
        },
        localStorageResultKey: 'course_result'
    };

});
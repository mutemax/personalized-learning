define(['_', 'entities/course'], function(_, course) {
    "use strict";

    return {
        getByQuestionId: getByQuestionId
    };

    function getByQuestionId(questionId) {
        var result = _.find(course.sections, function(section) {
            return _.some(section.questions, function(question) {
                return question.id === questionId;
            });
        });

        return result;
    }
});
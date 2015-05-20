define(['_', 'entities/course'], function(_, course) {
    "use strict";

    return {
        getByQuestionId: getByQuestionId
    };

    function getByQuestionId(questionId) {
        var result = _.find(course.objectives, function(objective) {
            return _.some(objective.questions, function(question) {
                return question.id === questionId;
            });
        });

        return result;
    }
});
define(['knockout'], function (ko) {
    return {
        install: install
    };
    function install() {
        ko.bindingHandlers.questionProgress = {
            init: function (element) {
                var $element = $(element);
                $element
                  .addClass('progress')
                  .append($('<div>').append($('<div>').addClass('progress-bar').append($('<div>').addClass('progress-bar-value'))))
            },
            update: function (element, valueAccessor) {
                var value = valueAccessor();
                var progress = value.progress();
                var questions = value.questions()
                var amountOfQuestions = questions.length;
                var percentage = progress / amountOfQuestions*100;
                
                $(element).find('.progress-bar-value').css('width', percentage + '%');
            }
        }
    }
});
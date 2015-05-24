define(['knockout'], function (ko) {
    return {
        install: install
    };
    function install() {
        ko.bindingHandlers.showProgress = {
            init: function (element) {
                var $element = $(element);
                $element
                  .addClass('progress')
                  .append($('<div>').append($('<div>').addClass('progress-bar').append($('<div>').addClass('progress-bar-value'))))
                var $container = $('.alternative-header');
                var $headerHeight = $('.title-background').height();
                function scroll() {
                    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrolled > $headerHeight) {
                        $container.addClass('show')
                    }
                    if (scrolled < $headerHeight) {
                        $container.removeClass('show')
                    }
                };
                $(window).on('scroll', scroll);
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    $(window).off('scroll', scroll);
                });
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
define(['knockout'], function (ko) {
    return {
        install: install
    };
    function install() {
        ko.bindingHandlers.showAlternativeHeader = {
            init: function (element) {

                var $element = $(element);
                var $headerHeight = $('.title-background').height();
                function scroll() {
                    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrolled > $headerHeight) {
                        $element.addClass('show')
                    }
                    if (scrolled < $headerHeight) {
                        $element.removeClass('show')
                    }
                };
                $(window).on('scroll', scroll);
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    $(window).off('scroll', scroll);
                });
            }
        }
    }
});
define(['knockout', '_'], function(ko, _) {

    return {
        install: install
    };

    function install() {
        ko.bindingHandlers.scrollElement = {
            init: function(element, valueAccessor) {
                var value = ko.unwrap(valueAccessor());
                if (!value) {
                    return;
                }
                scrollToElement($(element));
            },
            update: function(element, valueAccessor) {
                var value = ko.unwrap(valueAccessor());
                if (!value) {
                    return;
                }
                scrollToElement($(element));
            }
        };
    }

    function scrollToElement($element) {
        _.defer(function() {
            if (!$element.is(':hidden')) {
                $('html:not(:animated),body:not(:animated)').animate({
                    scrollTop: $element.offset().top
                }, function() {});
            }
        });
    }

});
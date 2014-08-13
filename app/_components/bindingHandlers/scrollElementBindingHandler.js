define(['knockout'], function (ko) {

    return {
        install: install
    };

    function install() {
        ko.bindingHandlers.scrollElement = {
            init: function (element, valueAccessor) {
                var value = ko.unwrap(valueAccessor());
                if (value) {
                    $('html:not(:animated),body:not(:animated)').animate({
                        scrollTop: $(element).offset().top
                    });
                }
            },
            update: function (element, valueAccessor) {
                var value = ko.unwrap(valueAccessor());
                if (value) {
                    $('html:not(:animated),body:not(:animated)').animate({
                        scrollTop: $(element).offset().top
                    });
                }

            }
        };
    }

})
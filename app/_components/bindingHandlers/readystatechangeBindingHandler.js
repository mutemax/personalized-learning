define(['knockout'], function (ko) {

    return {
        install: install
    };

    function install() {
        ko.bindingHandlers.readystatechange = {
            init: function (element) {
                $(element).wrapInner('<div>');
                $(element).append('<div class=\'loader\'>');
                $(element).children(':first').hide();
            },
            update: function (element, valueAccessor) {
                var value = valueAccessor();

                $(window).scrollTop(0);

                var $content = $(element).children(':first');
                var $loader = $(element).children('.loader');
                if (ko.unwrap(value)) {
                    $loader.hide();
                    $content.show();
                } else {
                    $content.hide();
                    $loader.show();
                }

            }
        };
    }
})
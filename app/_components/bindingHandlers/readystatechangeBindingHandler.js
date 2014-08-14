define(['knockout'], function (ko) {

    return {
        install: install
    };

    function install() {
        ko.bindingHandlers.readystatechange = {
            init: function (element) {
                $(element).wrapInner('<div>');
                $(element).append('<div class=\'loader\'>');
            },
            update: function (element, valueAccessor) {
                var value = valueAccessor();

                $(window).scrollTop(0);

                var $content = $(element).children(':first');
                var $loader = $(element).children('.loader');
                if (ko.unwrap(value)) {
                    $loader.hide();
                    $content.css({
                        visibility: 'visible',
                        overflow: 'visible',
                        height: 'auto'
                    });
                } else {
                    $content.css({
                        visibility: 'hidden',
                        overflow: 'hidden',
                        height: 0
                    });
                    $loader.show();
                }

            }
        };
    }
})
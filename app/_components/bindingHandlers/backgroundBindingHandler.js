define(['knockout'], function (ko) {

    return {
        install: install
    };

    function install() {
        ko.bindingHandlers.background = {
            init: function (element) {
                $(element)
                    .css('background-position', '0 0')
                    .css('background-repeat', 'no-repeat');
            },
            update: function (element, valueAccessor) {
                var value = valueAccessor();
                if (value) {
                    var src = ko.unwrap(value);
                    var image = new Image();
                    image.src = src;

                    image.onload = function () {
                        $(element)
                            .css('background-image', 'url(' + src + ')')
                            .css('height', image.height)
                            .css('width', image.width);
                    }
                }
            }
        };
    }

})
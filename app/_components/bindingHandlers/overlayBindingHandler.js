define(['knockout'], function (ko) {

    return {
        install: install
    };

    function install() {
        ko.bindingHandlers.overlay = {
            update: function (element, valueAccessor) {
                var value = valueAccessor();
                if (ko.unwrap(value)) {
                    $(element).addClass('overlay-wrapper');
                    $('<div />').addClass('overlay').appendTo(element);
                } else {
                    $(element).removeClass('overlay-wrapper');
                    $(element).children('.overlay').remove();
                }
            }
        };
    }

})
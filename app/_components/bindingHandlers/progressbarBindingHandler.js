define(['knockout'], function (ko) {

    return {
        install: install
    };

    function install() {
        ko.bindingHandlers.progress = {
            init: function (element) {
                $(element)
                    .addClass('progress')
                    .append($('<div>').addClass('progress-bar-wrapper').append($('<div>').addClass('progress-bar').append($('<div>').addClass('progress-bar-value'))))
                    .append($('<div>').addClass('progress-text-wrapper'));

            },
            update: function (element, valueAccessor) {
                var value = ko.unwrap(valueAccessor()) || 0;
                $(element).find('.progress-bar-value').css('width', value + '%');
                $(element).find('.progress-text-wrapper').text(value + "%");
            }
        };
    }

})
define(['knockout', 'jquery', 'durandal/composition'], function (ko, $, composition) {

    return {
        install: install
    };

    function install() {
        ko.bindingHandlers.fillInTheBlanks = {
            init: function (element, valueAccessor) {
                var $element = $(element),
                    value = valueAccessor();

                _.each(value, function(blank){
                    var source = $('[data-group-id=' + blank.groupId + ']', $element),
                        handler = function () {
                            if (ko.isWriteableObservable(blank.text)) {
                                blank.text(source.val().trim());
                            }
                        };

                    source
                        .val(undefined)
                        .on('blur change', handler);

                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        source.off('blur change', handler);
                    });

                    handler();
                });
            },
            update: function (element, valueAccessor) {
                var $element = $(element),
                    value = valueAccessor();

                _.each(value, function(blank){
                    var source = $('[data-group-id=' + blank.groupId + ']', $element),
                        text = ko.unwrap(blank.text);

                    if (source.is('select')) {
                        if (typeof text == typeof undefined) {
                            source.find('option:first').prop('selected', true);
                        } else {
                            source.val(text);
                        }
                    } else {
                        source.val(text);
                    }
                });
            }
        };
        composition.addBindingHandler('fillInTheBlanks');
    }
});

define(['knockout'], function (ko) {

    return {
        install: install
    };


    function install() {

        ko.bindingHandlers.blank = {
            init: function (element, valueAccessor) {
                var
                    value = valueAccessor(),
                    source = $('[data-group-id=' + value.groupId + ']'),
                    handler = function () {
                        if (ko.isWriteableObservable(value.text)) {
                            value.text(source.val().trim());
                        }
                    }
                ;

                source
                    .val(undefined)
                    .on('blur change', handler)
                ;

                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    source.off('blur change', handler);
                });

                handler();
            },
            update: function (element, valueAccessor) {
                var
                    value = valueAccessor(),
                    source = $('[data-group-id=' + value.groupId + ']')
                ;

                var text = ko.unwrap(value.text);

                if (source.is('select')) {
                    if (typeof text == typeof undefined) {
                        source.find('option:first').prop('selected', true);
                    } else {
                        source.val(text);
                    }
                } else {
                    source.val(text);
                }
            }
        };

    }

})
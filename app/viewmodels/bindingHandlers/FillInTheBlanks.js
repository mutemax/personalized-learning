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

                source.on('blur change', handler);
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

                source.val(ko.unwrap(value.text));
            }
        };

    }

})
define(['knockout', 'jquery', 'durandal/composition', 'translation'], function (ko, $, composition, translation) {

    return {
        install: install
    };

    function install() {
        ko.bindingHandlers.fillInTheBlanks = {
            init: function (element, valueAccessor) {
                var $element = $(element),
                    value = valueAccessor();
                $(".blankSelect").select({
                    defaultText: translation.getTextByKey('[fill in the blank choose answer]')
                });

                _.each(value, function (blank) {
                    
                    var source = $('[data-group-id=' + blank.groupId + ']', $element),
                        handler = function () {
                            blank.text (source.val().trim());
                        };

                    source.val(undefined)
                        .on('blur change', handler);

                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        source.off('blur change', handler);
                    });

                });
            },
            update: function (element, valueAccessor, allBindings, viewModel) {
                var value = valueAccessor();
                var $element = $(element);
                var isAnswered = viewModel.isAnswered();
                if (!isAnswered) {
                    $('.blankSelect').select('refresh');
                    $('.blankInput').each(function () {
                        $(this).val('');
                    });
                }
                else {
                    _.each(value, function (blank) {
                        var $source = $('[data-group-id=' + blank.groupId + ']', $element);

                        if ($source.is('input')) {
                            $source.val(blank.text());
                        } else if ($source.is('select')) {
                            $source.select('updateValue', blank.text());
                        }
                    });
                }
            }
        };
        composition.addBindingHandler('fillInTheBlanks');
    }
});

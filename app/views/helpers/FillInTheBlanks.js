define(['jquery', 'translation'], function ($, translation) {

    return function (view) {
        $(".blankSelect", view).each(function () {
            var option = $('<option />').text(translation.getTextByKey('[fill in the blank choose answer]')).val('').prependTo(this);
            $(this).val(option).trigger('change');
        });

        $(".blankSelect, .blankInput", view).on('keypress', function (e) {
            if (e.which == 13 || e.keyCode == 13) {
                e.preventDefault();
                e.stopImmediatePropagation();

                $(this).trigger('blur');
            }
            return true;
        });
    }

})
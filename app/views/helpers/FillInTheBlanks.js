define(['jquery'], function ($) {

    return function (view) {
        $(".blankSelect", view).each(function () {
            var option = $('<option />').text('Choose the answer...').prependTo(this);
            $(this).val(option).trigger('change');
        });

        $(".blankSelect, .blankInput").on('keypress', function (e) {
            if (e.which == 13 || e.keyCode == 13) {
                e.preventDefault();
                e.stopImmediatePropagation();

                $(this).trigger('blur');
            }
            return true;
        });
    }

})
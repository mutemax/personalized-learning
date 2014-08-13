define([], function () {

    return function (view) {
        $(".blankSelect", view).each(function () {
            $('<option />').text('Choose the answer...').attr('default', true).attr('selected', true).prependTo(this);
        });
    }

})
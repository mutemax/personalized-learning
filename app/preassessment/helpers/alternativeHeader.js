define(['jquery'], function ($) {

    return function (view) {
        var $element = $('.alternative-header', view);
        var headerHeight = $('.title-background').height();
        var firstHeaderHeight = $('.logo-header').outerHeight();

        $(".title-background")
            .clone()
            .appendTo($element)
            .css({ marginTop: "-" + (headerHeight + 10) + "px" });
        //10 px is the difference between logo-header height and alternative header height
        var debounced = _.debounce(scroll, 10);

        function subscribe() {
            $(window).on('scroll', scroll);
        }

        function unsubscribe() {
            $(window).off('scroll', scroll);
        }

        function scroll() {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (scrolled > (headerHeight + firstHeaderHeight)) {
                $element.addClass('show')
            }
            if (scrolled < (headerHeight + firstHeaderHeight)) {
                $element.removeClass('show')
            }
        };
        return {
            subscribe: subscribe,
            unsubscribe: unsubscribe
        }
    }

});
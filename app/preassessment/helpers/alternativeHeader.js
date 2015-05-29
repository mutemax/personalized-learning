define(['jquery'], function ($) {

    return function (view) {
        
        var $element = $('.alternative-header', view);
        var $headerHeight = $('.title-background').height();
        var debounced = _.debounce(scroll, 10);

        function subscribe() {
            $(window).on('scroll', scroll);
        }

        function unsubscribe() {
            $(window).off('scroll', scroll);
        }

        function scroll() {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (scrolled > $headerHeight) {
                $element.addClass('show')
            }
            if (scrolled < $headerHeight) {
                $element.removeClass('show')
            }
        };
        return {
            subscribe: subscribe,
            unsubscribe: unsubscribe
        }
    }

});
define(['jquery'], function ($) {

    return function (view) {
        
        var $element = $('.alternative-header', view);
        var $headerHeight = $('.title-background').height();
        var currentBackgroundImage = $('.title-background').css('background-image');
        var currentBackgroundSize = $('.title-background').css('background-size');
        var currentBackgroundRepeat = $('.title-background').css('background-repeat');

        $element.css({
            'background-image': currentBackgroundImage,
            'background-size': currentBackgroundSize,
            '-webkit-background-size': currentBackgroundSize,
            'background-repeat': currentBackgroundRepeat,
            'background-position': '0' + '-'+ ($headerHeight-70)+'px'
        })

        console.log($('.title-background').css('background-image'))
        var debounced = _.debounce(scroll, 10);

        function subscribe() {
            $(window).on('scroll', scroll);
        }

        function unsubscribe() {
            $(window).off('scroll', scroll);
        }

        function scroll() {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (scrolled > ($headerHeight+70)) {
                $element.addClass('show')
            }
            if (scrolled < ($headerHeight+70)) {
                $element.removeClass('show')
            }
        };
        return {
            subscribe: subscribe,
            unsubscribe: unsubscribe
        }
    }

});
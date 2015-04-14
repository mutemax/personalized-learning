define(['knockout'], function (ko) {
    return {
        install: install
    };
    function install() {
        ko.bindingHandlers.showProgress = {
            init: function (element) {
                var $element = $(element);
                var $container = $('.alternative-header');
                var $headerHeight = $('.title-background').height();
                var position = -document.documentElement.clientWidth + 125 + 'px -308px ';
                $element.css({
                    'background-position': position
                })
                function resize() {
                    position = -document.documentElement.clientWidth + 125 + 'px -308px ';
                    $element.css({
                        'background-position': position
                    })
                };
                function scroll() {
                    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrolled > $headerHeight) {
                        $container.addClass('show')
                    }
                    if (scrolled < $headerHeight) {
                        $container.removeClass('show')
                    }
                };
                $(window).on('resize', resize);
                $(window).on('scroll', scroll);
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    $(window).off('scroll', scroll);
                    $(window).off('resize', resize);
                });
            },
            update: function (element, valueAccessor) {
                var value = valueAccessor();
                var progress = value.progress();
                var questions = value.questions()
                var amountOfQuestions = questions.length;
                var percentage = progress / amountOfQuestions * 2 - 0.5;
                var $element = $(element);
                var $canvas = ($element.children('canvas'))[0];

                $canvas.width = 100;
                var ctx = $canvas.getContext('2d');
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#878a8b';
                ctx.beginPath();
                ctx.arc(50, 50, 43, -0.5 * Math.PI, 1.5 * Math.PI);
                ctx.stroke();


                ctx.strokeStyle = '#7dc9cd';
                ctx.beginPath();
                ctx.arc(50, 50, 43, -0.5 * Math.PI, percentage * Math.PI);
                ctx.stroke();
            }
        }
    }
});
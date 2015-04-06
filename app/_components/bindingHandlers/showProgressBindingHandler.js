define(['knockout'], function (ko) {
    return {
        install: install
    };
    function install() {
        ko.bindingHandlers.showProgress = {
            init: function (element) {
                var $element = $(element);
                var $container = $('.alternative-header')
                var position = -document.documentElement.clientWidth + 125+ 'px -308px ';
                $element.css({
                    'background-position': position 
                })
                $(window).on('resize', function () {
                    position = -document.documentElement.clientWidth + 125+'px -308px ';
                    $element.css({
                        'background-position': position 
                    })
                });
                $(window).on('scroll', function () {
                    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrolled > 380) {
                        $container.show()
                    }
                    if (scrolled < 380) {
                        $container.hide()
                    }
                });
            },
            update: function (element, valueAccessor) {
                var value = valueAccessor();
                var progress = value.progress();
                var questions=value.questions()
                var amountOfQuestions = questions.length;
                var percentage = progress / amountOfQuestions * 2-0.5;
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
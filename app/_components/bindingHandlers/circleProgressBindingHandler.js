define(['knockout'], function (ko) {

    return {
        install: install
    };
    function install() {
        ko.bindingHandlers.circleProgress = {
            init: function (element, valueAccessor) {
                var $element = $(element);
                var $canvas = $('<canvas width="100px" height="100px">')
                $canvas.appendTo($element)
            },
            update: function (element, valueAccessor) {
                var value = ko.unwrap(valueAccessor()) || 0,
                $element = $(element),
                $canvas = $(element).children('canvas')[0],
                ctx = $canvas.getContext('2d'),
                progressBarcolor,
                percentage = (value / 100) * 2 - 0.5;

                if (value < 35) {
                    progressBarcolor = "#f16162";
                    $element.addClass('fail');
                }
                if (34 < value) {
                    progressBarcolor = "#eda646"
                }
                if (value === 100) {
                    progressBarcolor = "#3e9c96";
                    $element.addClass('success');
                }

                ctx.lineWidth = 4;
                ctx.strokeStyle = '#f0f0f0';

                ctx.beginPath();
                ctx.arc(50, 50, 43, -0.5 * Math.PI, 1.5 * Math.PI);
                ctx.stroke();

                ctx.shadowColor = 'grey';
                ctx.shadowBlur = 1;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 1;
                ctx.stroke()

                ctx.strokeStyle = progressBarcolor;
                ctx.beginPath();
                ctx.arc(50, 50, 43, -0.5 * Math.PI, percentage * Math.PI);
                ctx.stroke();
            }
        }
    }
})
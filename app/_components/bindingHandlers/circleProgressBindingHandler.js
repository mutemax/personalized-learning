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
                var value = ko.unwrap(valueAccessor()) || 0;
                var $canvas= $(element).children('canvas')[0];
                var ctx = $canvas.getContext('2d');

                var percentage = value /50 - 0.5;


                console.log(value)

                ctx.lineWidth = 3;
                ctx.strokeStyle = '#878a8b';

                ctx.beginPath();
                ctx.arc(50, 50, 43, -0.5 * Math.PI, 1.5 * Math.PI);
                ctx.stroke();
                ctx.strokeStyle = '#7dc9cd';
                ctx.beginPath();
                ctx.arc(50, 50, 43, -0.5 * Math.PI, percentage * Math.PI);
                ctx.stroke();


                //ctx.strokeStyle = '#7dc9cd';
                //ctx.beginPath();
                //ctx.arc(50, 50, 43, -0.5 * Math.PI, percentage * Math.PI);
                //ctx.stroke();

                //$canvas.width = 100;
                //var ctx = $canvas.getContext('2d');
                //ctx.lineWidth = 3;
                //ctx.strokeStyle = '#878a8b';
                //ctx.beginPath();
                //ctx.arc(50, 50, 43, -0.5 * Math.PI, 1.5 * Math.PI);
                //ctx.stroke();
                //ctx.strokeStyle = '#7dc9cd';
                //ctx.beginPath();
                //ctx.arc(50, 50, 43, -0.5 * Math.PI, percentage * Math.PI);
                //ctx.stroke();
            }
        }
    }
})
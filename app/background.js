define(['_'], function (_) {

    return {
        apply: apply
    }

    function apply(background) {

        if (!background || !background.image || !background.image.src) {
            return;
        }

        var element = $('.title-background');
       
        var image = new Image(),
            src = background.image.src,
            position = '0 0',
            repeat = 'no-repeat',
            size = 'auto';


        if (background.image.type === 'repeat') {
            repeat = 'repeat';
        }

        if (background.image.type === 'fullscreen') {
            size = 'cover';
            position = 'center';
        }

        image.onload = function () {
            $(element)
                .css({
                    'background-image': 'url(' + src + ')',
                    'background-position': position,
                    '-webkit-background-size': size,
                    'background-size': size,
                    'background-repeat': repeat
                });
        }

        image.src = src;
    }

});
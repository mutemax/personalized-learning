define(['jquery'], function ($) {

    return function (view) {

        $(".blankSelect", view).each(function () {
            var option = $('<option />').text('Choose the answer...').prependTo(this);
            $(this).val(option).trigger('change');
        });

        $(".blankSelect", view).each(function () {
            var self = this,
                options = [];
            
            _.each(_.rest(self.options,1), function (option) {
                options.push(option);
            });

            $(self).wrap('<div class="select-wrapper"></div>');
            var $selectWrapper = $(self).parent('.select-wrapper');

            var valueWrapper = $('<div class="value"></div>').text('click to choose...').appendTo($selectWrapper);

            $selectWrapper.on('click', function () {
                show($selectWrapper, options, function (newValue) {
                    $(self).val(newValue).trigger('change');
                    $(valueWrapper).text(newValue);
                });
            });
        });
        var show = function ($element, options, callback) {
            var $html = $('html');

            if ($element.hasClass('active')) {
                return;
            }
            $element.addClass('active');

            var container = $('<div />')
                    .addClass('select-container')
                    .css({
                        position: 'absolute',
                        left: ($element.offset().left - 5) + 'px',
                        top: ($element.offset().top + $element.height()) + 'px',
                        width: ($element.width() + 45) + 'px'
                    })
                    .append($('<ul/>')
                        .addClass('unstyled')
                        .on('click', 'li', function () {
                            var text = $(this).text();
                            $element.find('.current').text(text).removeClass('default');
                            if (callback) {
                                callback(text);
                            }
                        })
                        .append(_.chain(options)
                            .filter(function (option) {
                                return option.text !== $element.find('.current').text();
                            })
                            .map(function (option) {
                                return $('<li/>')
                                    .text(option.text);
                            }).value())
                    )
                    .appendTo('.container');

            var handler = function () {
                container.remove();
                $element.removeClass('active');
                $html.off('click', handler);
                $(window).off('resize', handler);
            };

            _.defer(function () {
                $html.on('click', handler);
                $(window).on('resize', handler);
            });
        };

        $(".blankSelect, .blankInput", view).on('keypress', function (e) {
            if (e.which == 13 || e.keyCode == 13) {
                e.preventDefault();
                e.stopImmediatePropagation();

                $(this).trigger('blur');
            }
            return true;
        });
    }

})
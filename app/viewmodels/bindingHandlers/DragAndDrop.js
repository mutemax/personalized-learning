define(['knockout'], function (ko) {

    return {
        install: install
    };


    function install() {

        ko.bindingHandlers.draggableTextContainer = {
            init: function (element, valueAccessor, allBindingsAccessor) {
                var allBindings = allBindingsAccessor();
                var scope = ko.unwrap(allBindings.scope) || 'question';


                $(element).parent()
                    .on('dragstart', '.drag-and-drop-text-draggable', function () {
                        $(element).addClass('active');
                    })
                    .on('dragstop', '.drag-and-drop-text-draggable', function () {
                        $(element).removeClass('active');
                        if ($(element).children('.drag-and-drop-text-draggable').length) {
                            $(element).children('.drag-and-drop-text-draggable-container-message').hide();
                        } else {
                            $(element).children('.drag-and-drop-text-draggable-container-message').show();
                        }
                    });

                $(element).droppable({
                    accept: '.drag-and-drop-text-draggable',
                    scope: scope,
                    drop: function (e, ui) {
                        ui.draggable.css('left', '').css('top', '').appendTo(this);
                        var text = ko.dataFor(ui.draggable.get(0));
                        if (text.dropSpot) {
                            text.dropSpot.text(undefined);
                        }
                    }
                });
            }
        };

        ko.bindingHandlers.draggableText = {
            init: function (element, valueAccessor, allBindingsAccessor) {
                var allBindings = allBindingsAccessor();
                var scope = ko.unwrap(allBindings.scope) || 'question';
                var $element = $(element);

                $element.draggable({
                    scope: scope,
                    revert: 'invalid',
                    appendTo: 'body',
                    helper: 'clone',
                    tolerance: 'pointer',
                    cursorAt: { left: 10, top: 15 },
                    scroll: false,
                    start: function () {
                        $element.css({ visibility: 'hidden' });
                    },
                    stop: function () {
                        $element.css({ visibility: 'visible' });
                    }
                });
            }
        };


        ko.bindingHandlers.dropspot = {
            init: function (element, valueAccessor, allBindingsAccessor) {
                var value = valueAccessor();
                var allBindings = allBindingsAccessor();

                var left = ko.unwrap(value.x);
                var top = ko.unwrap(value.y);
                var scope = ko.unwrap(allBindings.scope) || 'question';

                $('.ui-draggable')
                    .on('dragstart', function (event, ui) {

                        $(element).addClass('active');

                        if ($(element).children('.drag-and-drop-text-draggable').length) {
                            return;
                        }

                        $(element).width(ui.helper.outerWidth());
                        $(element).height(ui.helper.outerHeight());

                    })
                    .on('dragstop', function (event, ui) {
                        $(element).removeClass('active');

                        $(element).css('width', '');
                        $(element).css('height', '');
                    });

                $(element).droppable({
                    accept: '.drag-and-drop-text-draggable',
                    scope: scope,
                    out: function () {
                        $(element).droppable('option', 'accept', '.drag-and-drop-text-draggable');
                    },
                    drop: function (e, ui) {
                        var text = ko.dataFor(ui.draggable.get(0));

                        $(element).droppable('option', 'accept', ui.draggable);
                        ui.draggable.css('left', '').css('top', '').appendTo(this);

                        if (ko.isWriteableObservable(value.text)) {
                            value.text(text);
                            text.dropSpot = value;
                        }
                    }
                });

                $(element).css('left', left + 'px').css('top', top + 'px');
            },
            update: function (element, valueAccessor) {
                var value = valueAccessor();
                var text = ko.unwrap(value.text);

                if (text) {
                    // I believe it will be used when we have to restore previously saved answer
                } else {
                    $(element).droppable('option', 'accept', '.drag-and-drop-text-draggable');
                    $(element).children('.drag-and-drop-text-draggable').css('left', '').css('top', '')
                        .appendTo($('.drag-and-drop-text-draggable-container'));
                    $(element).children('.drag-and-drop-text-draggable-container-message').hide();
                }
            }
        };




    }

})
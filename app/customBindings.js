define(['knockout', 'jquery', 'durandal/composition'], function (ko, $, composition) {
    "use strict";

    return {
        init: function () {

            ko.bindingHandlers.progress = {
                init: function (element) {
                    $(element)
                        .addClass('progress')
                        .append($('<div>').addClass('progress-bar-wrapper').append($('<div>').addClass('progress-bar').append($('<div>').addClass('progress-bar-value'))))
                        .append($('<div>').addClass('progress-text-wrapper'));

                },
                update: function (element, valueAccessor) {
                    var value = ko.unwrap(valueAccessor()) || 0;
                    $(element).find('.progress-bar-value').css('width', value + '%');
                    $(element).find('.progress-text-wrapper').text(value + "%");
                }
            };

            ko.bindingHandlers.readystatechange = {
                init: function (element) {
                    $(element).wrapInner('<div>');
                    $(element).append('<div class=\'loader\'>');
                    $(element).children(':first').hide();
                },
                update: function (element, valueAccessor) {
                    var value = valueAccessor();

                    $(window).scrollTop(0);

                    var $content = $(element).children(':first');
                    var $loader = $(element).children('.loader');
                    if (ko.unwrap(value)) {
                        $loader.hide();
                        $content.show();
                    } else {
                        $content.hide();
                        $loader.show();
                    }

                }
            };

            ko.bindingHandlers.overlay = {
                update: function (element, valueAccessor) {
                    var value = valueAccessor();
                    if (ko.unwrap(value)) {
                        $(element).addClass('overlay-wrapper');
                        $('<div />').addClass('overlay').appendTo(element);
                    } else {
                        $(element).removeClass('overlay-wrapper');
                        $(element).children('.overlay').remove();
                    }
                }
            };

            ko.bindingHandlers.blank = {
                init: function (element, valueAccessor) {
                    var value = valueAccessor();

                    $('[data-group-id=' + value.id + ']').on('blur', function () {
                        if (ko.isWriteableObservable(value.text)) {
                            value.text($(this).val().trim());
                        }
                    });

                }
            };

            ko.bindingHandlers.background = {
                init: function (element) {
                    $(element)
                        .css('background-position', '0 0')
                        .css('background-repeat', 'no-repeat');
                },
                update: function (element, valueAccessor) {
                    var value = valueAccessor();
                    if (value) {
                        var src = ko.unwrap(value);
                        var image = new Image();
                        image.src = src;

                        image.onload = function () {
                            $(element)
                                .css('background-image', 'url(' + src + ')')
                                .css('height', image.height)
                                .css('width', image.width);
                        }
                    }
                }
            };

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
                        }
                    });


                    $(element).droppable({
                        accept: '.drag-and-drop-text-draggable',
                        scope: scope,
                        drop: function (e, ui) {
                            ui.draggable.css('left', '').css('top', '').appendTo(this);
                        }
                    });
                }
            };

            ko.bindingHandlers.draggableText = {
                init: function (element, valueAccessor, allBindingsAccessor) {
                    var allBindings = allBindingsAccessor();
                    var scope = ko.unwrap(allBindings.scope) || 'question';

                    $(element).draggable({
                        scope: scope,
                        revert: 'invalid',
                        appendTo: 'body',
                        helper: 'clone',
                        tolerance: 'pointer',
                        cursorAt: { left: 10, top: 15 },
                        scroll: false
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

            ko.bindingHandlers.scrollElement = {
                init: function (element, valueAccessor) {
                    var value = ko.unwrap(valueAccessor());
                    if (value) {
                        $('html:not(:animated),body:not(:animated)').animate({
                            scrollTop: $(element).offset().top
                        });
                    }
                },
                update: function (element, valueAccessor) {
                    var value = ko.unwrap(valueAccessor());
                    if (value) {
                        $('html:not(:animated),body:not(:animated)').animate({
                            scrollTop: $(element).offset().top
                        });
                    }

                }
            };

        }

    };

});
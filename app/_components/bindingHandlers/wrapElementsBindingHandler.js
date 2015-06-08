define(['knockout'], function (ko) {

    return {
        install: install
    };
    function install() {
        ko.bindingHandlers.wrapElements = {
            init: function (element) {
                
                $("table", element).each(function () {
                    var $self = $(this);
                    $self.wrap('<div class="table-wrapper">');
                    var $wrapper = $self.parent('');
                    var align = $self.attr('align');
                    $wrapper.css('float', align);
                });
                $("img", element).each(function () {
                    var $self = $(this);
                    $self.wrap('<div class="image-wrapper">');
                    var $wrapper = $self.parent();
                    var float = $self.css('float');
                    $wrapper.css('float', float);
                });
              
            }
        }
    }
})
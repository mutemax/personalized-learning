define(['knockout'], function (ko) {

    return {
        install: install
    };
    function install() {
        ko.bindingHandlers.heightAnimation = {
            update: function (element, valueAccessor) {
                var $element = $(element),
                    isExpanded = valueAccessor().isExpanded,
                    $animationContainer = $element.find('[data-animate]'),
                    speed = 300;

                if (isExpanded()) {
                    $animationContainer.slideDown(speed);
                } else {
                    $animationContainer.slideUp(speed);
                }
            }
        }
    }
})
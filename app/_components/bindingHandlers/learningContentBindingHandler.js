define(['durandal/composition','knockout'], function (composition, ko) {
    'use strict';
    
    return {
        install: install
    };
    
    function install(){
        ko.bindingHandlers.learningContent = {
            init: function (element, valueAccessor) {
                var $element = $(element),
                    html = valueAccessor();

                var dataType = getLearningContentType(html);

                switch(dataType){
                    case 'hotspot': 
                        var hotspotOnImage = new HotspotOnImage($(html)[0]);
                        $element.html(hotspotOnImage.element);
                        $element.css('overflow-x', 'visible');
                        break;
                    default:
                        $element.css('overflow-x', 'auto');
                        $element.html(html);
                        return ko.bindingHandlers.wrapElements.init(element, valueAccessor);
                }
            }
        };

        composition.addBindingHandler('learningContent');

        function getLearningContentType(data){
            var $output = $('<output>').html(data),
                dataType = $('[data-type]', $output).attr('data-type');

            return dataType;
        }
    }
});
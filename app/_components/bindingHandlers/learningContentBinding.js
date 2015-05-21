define(['durandal/composition', 'knockout'], function (composition, ko) {
    
    return {
        install: install
    };
    
    function install(params) {
        ko.bindingHandlers.learningContent = {
            init: function (element, valueAccessor) {
                var $element = $(element),
                    html = valueAccessor();
                
                var $output = $('<output>');
                $output.html(html);
                
                var learningContent = $('[data-type]', $output);
                var dataType = learningContent.attr('data-type');
                
                
                switch(dataType){
                    case 'hotspot': 
                        var hotspotOnImage = new HotspotOnImage($(html)[0]);
                        $element.html(hotspotOnImage.element);
                    default:
                        $element.html(html);
                }
            }
        };
    }
    
    
    
    composition.addBindingHandler('learningContent');
});
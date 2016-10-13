(function() {
    function seekBar($document) {
        
        /*
        * @function calculatePercent 
        * @desc Calculates the percent from seekBar based on location where the bar was clicked (pageX)
        * @param {Object} seekBar, {object} event 
        */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
        
        
        return {
            templateUrl: '/templates/directives/seek_bar.html', //seek bar HTML
            replace: true, //With true, replaces the directives element
            restrict: 'E', //Restrict to a certain type, in this case declared as an element
            scope: { 
                onChange: '&'
            },  //This gives as an isolated scope only used for the directive
            
            link: function(scope, element, attributes) {
                
                scope.value = 0;
                scope.max = 100;
 
                var seekBar = $(element);
                
                attributes.$observe('value', function(newValue) {
                    //console.log("A Value Change!" + newValue);
                    scope.value = newValue;
                    //console.log("scope.value is" + scope.value);
                });
 
                attributes.$observe('max', function(newValue) {
                    //console.log("A Max Change!" + newValue);
                    scope.max = newValue;
                    //console.log("scope.max is" + scope.max);
                });
                            
                var percentString = function () {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                };
 
                scope.thumbStyle = function() {
                    return {left: percentString()}  
                };
                
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                                
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };
                
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                                            
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                        
                    });
 
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
                
            }
            
        };
        
    }
 
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
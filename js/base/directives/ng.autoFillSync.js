/**
 * Created by EX-TANXINZHENG001 on 2014/6/10.
 */
define(function () {
    var init = function(appModule){
        appModule.directive('autoFillSync',['$timeout', function($timeout){
            return {
                restrict:"A",
                require:'?ngModel',
                link:function(scope,elem,attrs,ngModel){
                    var origVal = elem.val();
                    $timeout(function(){
                        var newVal = elem.val();
                        if(ngModel.$pristine){
                            ngModel.$setViewValue(newVal);
                        }
                    },500);
                }
            }
        }]);
    };
    return {
        init:init
    };
});
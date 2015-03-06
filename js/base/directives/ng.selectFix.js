/**
 * IE 动态改变下拉框
 * @description: 修复IE8下动态更新下拉框值不变的情况
 */
define(function () {
    var init = function(appModule){
        appModule.directive('ieSelectFix', function($timeout){
             return {
                 require:'select',
                 restrict:'A',
                 link:function(scope,elem,attrs){
                	 var isIE = document.attachEvent;
                	 if(!isIE)return;
                	 var control = elem[0];
                	 scope.$watch(attrs.ieSelectFix,function(){
                		var option = document.createElement('option');
                		control.add(option,null);
                		control.remove(control.length-1);
                	 });
                 }
             }
        });
    };
    return {
        init:init
    };
});
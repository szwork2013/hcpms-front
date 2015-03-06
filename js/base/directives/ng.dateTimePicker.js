/**
 * created by River Lee on 2014-05-21
 * <input dateTimePicker="{
 *   format:"yyyy-mm-dd",//格式化
     autoclose:true,//自动关闭
     startView:2,//
     minView:2,
     //startDate:"2000-1-1",// 日期开始时间
     //endDate:new Date(),//日期结束时间
     initialDate:new Date()//初始化日期
 * }">
 */
define(function(require){
	'use strict';
	require('Jquery');
	require('common/datetime');
	
	var init = function(appModule){
		appModule.directive('dateTimePicker', function($compile,$http) {
             var link = function(scope, elm, attrs,ctrl) {
                 var options = scope.dateTimePicker;
                // var options = attOption?scope.$eval(attOption):{};
                 //默认选项
                 var defaultdOption = {
                     format:"yyyy-mm-dd",
                     autoclose:true,
                     startView:2,
                     minView:2,
                     initialDate:new Date()
                 };
                 options = angular.extend(defaultdOption,options);
            	 $(elm).attr("class","DateTime")
            	 	.datetimepicker(options).on('change',function(){
                         var val = $(this).val()
                         scope.$apply(function(){
                             ctrl.$setViewValue(val);
                         });
                     });
             };
			 return {
                scope:{dateTimePicker:"="},
                require:'ngModel',
                link:link
			 }; 
		}); 
	};

	return {
		version:"0.0.1",
		init:init
	}
});
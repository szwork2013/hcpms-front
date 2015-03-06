define(function(){
    'use strict';
	var init = function(appModule){
		appModule.directive('navigation', function() {
			 return { 
			 	restrict: 'E', 
			 	template: '<ul class="Fl"><li ng-repeat="nav in navInfo"'+ 
			 						'onmouseover="angular.element(this).addClass(\'over\');"'+
			 						'onmouseout="angular.element(this).removeClass(\'over\');">'+
								'<b>{{nav.text}}<i></i></b>'+
								'<p ng-mouseover="showNav($event)" ng-mouseout="hideNav($event)">'+
					                 '<i></i>'+
									'<a ng-repeat="subNav in nav.subNavs" tab href="{{subNav.href}}"' +
                                        ' title="{{subNav.text}}" module="{{subNav.module}}">{{subNav.text}}</a>'+
								'</p>'+
							'</li></ul>',
			 	scope : { navInfo : '='}, //将标签中的nav-Info映射到这里这个scope的navInfo中
			 	replace: true ,
			 	//templateUrl : '../tpl/ngPagination.tpl',//模板url
			 	transclude : true, //嵌入
			 	controller : function($scope, $element, $attrs){
			 		$scope.showNav = function(event){
			 			//console.log(event.target);
			 			angular.element(event.target).parent().addClass("over");
			 		};
			 		$scope.hideNav = function(event){
			 			angular.element(event.target).parent().removeClass("over");
			 		};
			 	}
			 }; 
		}); 
	}

	return {
		version:"0.0.1",
		init:init
	}
});
/**
 * created by River Lee on 2014-05-27
 * link指令是用来单页面内页面加载使用，基于ng-include实现。
 * 模拟页面内a标签指定跳转。
 * link 跳转的地址
 * target 跳转的目标对象
 * hideSelf   链接后是否显示自己，默认是显示的，如果设置为否，则回找寻
 * 链接的页面中的是否存在lreturn class，存在则添加返回功能。如果没有添加
 * 也可以收到添加返回功能。详细如下：
 *
 *  history 提供历史浏览页面的记录，支持后退和前进。最大保留5个页面。
 * <a link="page.htm" ltarget="showBlock"></a>
 * <div id="showBlock"></div>
 *
 */
define(function () {
    'use strict';
    var init = function (appModule) {
        appModule.directive('link', function ($compile) {
            /**
             * @Property
             * @type {Array}
             * @desc 页面的浏览记录
             *        默认最大存储前后5个页面
             */
            var record = [];

            var last = "";

            var link = function (scope, elm, attrs, ctrl) {
                var $target = $("#"+attrs.target);
                $target.attr("ng-include","url");
                $compile($target)(scope);
            };
            var controller = function($scope, $element, $attrs){
                var $target = $("#"+$attrs.target);
                $element.on("click",function(){
                   $("#"+$attrs.hideSelf).css("display","none");
                    jump($attrs.link);
                });
                /**
                 *  @Function
                 *  @type {Number}
                 *  @desc 历史浏览记录，可以传递负数进行后退。
                 */
                $scope.history = function(num){
                    if(!$attrs.lHideSelf){
                        $("#"+$attrs.hideSelf).css("display","block");
                        $scope.url = "";
                    }
                   // jump(last);
                };
                /**
                 *
                 * @param url {String}
                 * @param target {String}
                 */
                var jump = function(url){
                    $scope.$apply(function(){
                        $scope.url = url;
                        //$compile($target)($scope);
                        console.log(url)
                    });
                }
            };
            return {
                link: link,
                controller: controller
            };
        });
    };

    return {
        version: "0.0.1",
        init: init
    }
});
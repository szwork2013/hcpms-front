/**
 * Created by EX-LIJIANG001 on 2014/5/28.
 * 页签功能
 * tab ：属性中追加要连接的地址
 * title ：页签显示的名称
 * module ： 属主，连接地址所属页面
 *
 * <div tab title="协议" module="agreement"></div>
 */
define(function(){
    'use strict';
    var init = function(appModule){
        appModule.directive('tab',['$location','$compile', function($location,$compile) {
            //页签前缀
            var PREFIX = "ng-tab-";
            var link = function(scope, elm, attrs,ctrl) {
                //清除选中
                var cleanAct = function(){
                    $("#topTab li").removeClass("act");
                }
                //添加事件
                $("#topTab").unbind("click").on("click",function(e){
                    e = e || window.event;
                    var target = e.target,
                        $this = $(target);
                    if(target.tagName.toLocaleLowerCase() === "li"){
                        cleanAct();
                        $this.addClass("act");
                        //隐藏所有内容部分
                        $(".main").hide();
                        //显示当前的页签部分
                        $("#"+$this.attr("id").substr(7)).show();
                    }else if(target.tagName.toLocaleLowerCase() === "i"){
                        var self =  $this.parent();
                        if(self.hasClass("act")){
                            cleanAct();
                            //上一个页签
                            var prev = self.prev();
                            if(!prev[0]){
                                //如果没有上一个页签则从头开始被选中
                                prev = self.parent().find("li:eq(1)") ;
                            }
                            prev.addClass("act");
                        }
                        self.remove();
                    }
                });
                //$(".main").hide();
                /**
                 * 显示tab页签
                 * @param isColse 是否关闭
                 * @param title
                 * @param module
                 */
                var showTab = function(isColse,title,module){
                    cleanAct();
                    $(".main").hide();
                    var $module = $("#"+PREFIX+module);
                    //判断是否存在此页签内容部分
                    var $body =  $("#"+module);
                    if(!$body[0]){
                        /*$body =  $("<div ng-view='"+module+"' auto-hide='true' class='main'></div>");
                         $body.appendTo($("#filling"));
                         var link = $compile($body);
                         link(scope);
                         scope.$emit('$routeChangeSuccess');*/
                    }
                    //判断是否存在此页签，存在则被选中，否则创建
                    if(!$module[0]){
                        $module = $("<li id='"+PREFIX+module+"'>"+title+(isColse ? "<i></i>":"")+"</li>");
                        $module.appendTo($("#topTab"))
                    }
                    $body.show();
                    $module.addClass("act");
                }
                elm.on("click",function(){
                    showTab(true,attrs.title,attrs.module);
                });
            };
            var ctrl = function($scope, $element, $attrs){

            }
            return {
                link:link,
                controller:ctrl,
                priority: -399
            };
        }]);
    };

    return {
        version:"0.0.1",
        init:init
    }
});
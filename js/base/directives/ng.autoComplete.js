/**
 * Created by EX-LIJIANG001 on 2014/6/4.
 * 自动完成功能
 */
define(function (require) {
    'use strict';
    var init = function (appModule) {
        appModule.directive('autoComplete', ['$http','ConfigFactory', function ($http,ConfigFactory) {
            var link = function (scope, elm, attrs, ctrl) {
                var autoType = attrs.autoType;
                var $elm = $(elm);
                var suggest = $elm.siblings(".suggest");
                if (!suggest[0])
                    suggest = $("<ul class=suggest>").insertAfter($elm);
                $elm.blur(function () {
                    suggest.css("borderColor", "#ddd");
                    setTimeout(function () {
                        suggest.hide()
                    }, 250);
                });
                $elm.focus(function () {
                    suggest.css("borderColor", "");
                    if ($elm.val().trim().length > 0)suggest.show();
                });
                var lastKey,//上次输入的关键字
                    lastReuqest;//上次请求
                $elm.keyup(function (e) {//关键字输入
                    e = e || event;
                    var k = e.which || e.keyCode,
                        key = $(this).val().trim()
                    if (k === 27){
                        return;//忽略ESE
                    }else if(k === 38 || k === 40){//上下键移动选项
                        var act;
                        var li=suggest.find("li");
                        if(!li[0])return;//如果没有建议直接返回
                        for(var i=li.length-1;i>=0;i--){
                            if(li[i].className=="over"){
                                act=i;
                                break;
                            };
                        };
                        if(k==38){//上
                            if(!act){
                                act=li.length-1;
                            }else{
                                act--;
                            };
                        }else if(k==40){//下
                            //act = typeof act === "undefined"?0:act++;
                            if(act==li.length-1){
                                act=0;
                            }else{
                                if(act==undefined){
                                    act=0;
                                }else{
                                    act++;
                                }
                            };
                        };
                        li.each(function(_,i){
                            i.className=""
                        });
                        li[act].className="over";
                        var input=suggest.siblings("input");
                        var liHtml = li[act].innerHTML;
                        input.val(liHtml);
                        ctrl.$setViewValue(liHtml);
                        input.key=liHtml;
                    }else{
                        if (!key)
                            return;
                        if (key === lastKey) {//防止相同内容多次查询
                            suggest.show();
                            return;
                        } else {
                            lastKey = key;
                        };
                        if (lastReuqest)
                            lastReuqest.abort();//取消上次查询
                        search(key);
                        /*lastReuqest = new $.ajax({
                            url: "common/code",
                            dataType: "json",
                            cache: false,
                            data: {
                                codeType:autoType,
                                codeName: escape(key)
                            },
                            success: function (data) {
                                console.log(data)
                                if (data.result) {
                                    suggest.html("");
                                    $(data.result).each(function (_, d) {
                                        console.log(d)
                                        $("<li>").html(d.text).mouseover(function () {
                                            this.className = "over"
                                        })
                                            .click(function () {
                                                $elm.val(this.innerHTML)
                                            })
                                            .mouseout(function () {
                                                this.className = ""
                                            }).appendTo(suggest);
                                    });
                                    suggest.show();
                                } else {
                                    suggest.hide();
                                };
                            },error:function(e){
                                console.log(e)
                            }
                        });*/
                    }
                });
                var search = function(key){
                    $http({
                        url:ConfigFactory.isDebug ? "mock/base/autoComplete" : "common/code",
                        method:'POST',
                        data:{
                            codeType:autoType,
                            codeName: key
                        }
                    }).success(function(data){
                        if (data.result) {
                            suggest.html("");
                            $(data.result).each(function (_, d) {
                                $("<li>").html(d.codeName).mouseover(function () {
                                    this.className = "over"
                                }).click(function () {
                                    ctrl.$setViewValue(this.innerHTML);
                                    $elm.val(this.innerHTML)
                                }).mouseout(function () {
                                    this.className = ""
                                }).appendTo(suggest);
                            });
                            suggest.show();
                        } else {
                            suggest.hide();
                        };
                    }).error(function(data){
                    });
                }
            };
            return {
                require:'ngModel',
                link: link
            };
        }]);
    };

    return {
        version: "0.0.1",
        init: init
    }
});
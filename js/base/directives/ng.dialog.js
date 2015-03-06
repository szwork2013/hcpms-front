/**
 * Created by EX-lijiang001 on 2014/5/16.
 * 弹出层
 * @param $attrs {object}
 *      dialogTarget="弹出的目标"；
 *      dialogType 弹出的类型[alert|confirm]
 *      dialogMsg  弹出类型为alert and confirm 时传入
 *      confirm-fun 这个是确认的回调函数，每一种都可以类型都是可以触发这个方法
 *     当dialogTarget有值则直接控制选择的目标。
 *
 *     例如：
 *     弹出指定内容 其他属性是失效
 *     <a dialog dialog-target="model" >弹出层</a>
 *     弹出提示框
 *     <a dialog dialog-type="alert" dialog-msg="这只是一个简单的提示框">提示框</a>
 *     弹出确认框
 *     <a dialog dialog-type="confirm" dialog-msg="这只是一个简单的提示框" confirm-fun="{function}">提示框</a>
 */
define(function(){
    'use strict';
    var init = function(appModule){
        appModule.directive('dialog', function() {
             var ctrl = ['$scope', '$element', '$attrs',function($scope, $element, $attrs) {
                    this.databound = $attrs.ngModel;
             }];
            return {
                link:function(scope, elm, attr){
                    //获得目标对象
                    var target = $("#"+attr.dialogTarget);
                    //创建弹出层
                    var pop = new Pop(target,elm);
                    pop.build();
                    target.data("dialog",pop);
                },
                controller : ctrl
            };
        });
    }

    return {
        version:"0.0.1",
        init:init
    }
});
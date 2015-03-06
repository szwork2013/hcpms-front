/**
 * Created by EX-LIJIANG001 on 2014/5/29.
 * 弹出选择框
 *  pop-choice="popChoice" popChoice为ID，这个ID包含的为弹出的选择框
 *
 *  <input  name="speciality" ng-model="institutionDetail.speciality"
 * type="text" dialog dialog-target="popChoice" pop-choice="popChoice">
 *
 * 这里不基于任何显示方式。例子中是基于弹窗实现，可以扩展你需要的各种窗口显示
 * 方式。
 */
define(function () {
    'use strict';
    var init = function (appModule) {
        appModule.directive('popChoice', ['$http', function ($http) {
            //分隔符
            var DELIMITER = ",";
            var ctrl = ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                var self = this,
                    $frame = $("#" + $attrs.popChoice);
                var list = self.list = $frame.find(".list"),
                    has = self.has = $frame.find(".has"),
                    confirm = self.confirm = $frame.find(".Confirm"),
                    close = self.close = $frame.find(".close");

                $scope.showSub = function (e) {
                    e = e || window.event;
                    var target = $(e.target);
                    target = target.hasClass(".Dn") ? target : target.find(".Dn");
                    target.show();
                };
                $scope.hideSub = function (e) {
                    e = e || window.event;
                    $(e.target).parent(".Dn").hide();
                };
                $scope.choose = function (e) {
                    e = e || window.event;
                    var input = $(e.target);
                    if (input.attr("checked")) {
                        self.createShowBlock(input, input.val(), input.attr("text"));
                    } else {
                        has.find("#v_" + input.val()).remove();
                    }
                };
                self.createShowBlock = function (self, val, text) {
                    //@TODO 需确认是否需要重新生成ID对应选中和显示描述的内容
                    var hasI = $("<i val='" + val + "' text='" + text + "' id='v_" + val + "'>" + text + "</i>");
                    hasI.data("input", self)
                        .on("click", function () {
                            var that = $(this)
                            that.data("input")
                                .prop("checked", false);
                            that.remove();
                        });
                    has.append(hasI);
                }
                //将字典值转换成描述值
                self.transformDesc = function (val) {
                    var arrVal = val.split(DELIMITER),
                        data = $scope.choiceData,
                        desc = [];
                    for (var z = 0; z < arrVal.length; z++) {
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0, subData = data[i].sub; j < subData.length; j++) {
                                if (subData[j].codeno === arrVal[z]) {
                                    desc.push(subData[j].codename);
                                }
                            }
                        }
                    }
                    return desc.join(DELIMITER);
                }
            }];
            var link = function (scope, elm, attrs, ctrls) {
                var selfCtrl = ctrls[0],
                    ngModelCtrl = ctrls[1];

                var targetInput = $(elm);

                //拷贝一个文本框对象作为显示
                var showInput = targetInput.clone(true);
                //将拷贝的输入框放到原来的input位置
                targetInput.css("display", "none").parent().append(showInput);
                showInput.click(function () {
                    targetInput.click();
                    //当页面打开重置选择块
                    var showText = $(this).val(),
                        arrVal = (ngModelCtrl.$viewValue + "").split(DELIMITER);
                    if (showText) {
                        angular.forEach(showText.split(DELIMITER), function (val, inx) {
                            var input = $("[value=" + arrVal[inx] + "]");
                            input.prop("checked", true);
                            selfCtrl.createShowBlock(input, arrVal[inx], val);
                        });
                    }
                }).addClass("popChoice");

                $http.get("mock/base/deptInfo").success(function (data) {
                    scope.choiceData = data.result;
                    scope.$watch(function () {
                        showInput.val(selfCtrl.transformDesc(ngModelCtrl.$viewValue + ""));
                    })
                });

                var list = selfCtrl.list,
                    has = selfCtrl.has,
                    confirm = selfCtrl.confirm,
                    close = selfCtrl.close;

                list.find("li").on("mouseover", function () {
                    $(this).find(".Dn").show();
                }).on("mouseout", function () {
                    $(this).find(".Dn").hide();
                }).find("input").on("click", function () {
                    var input = $(this);
                    if (input.attr("checked")) {
                        selfCtrl.createShowBlock(input, input.val(), input.attr("text"));
                    } else {
                        has.find("#v_" + input.val()).remove();
                    }
                });
                confirm.on("click", function () {
                    var text = [], val = []
                    $.each(has.find("i"), function () {
                        var that = $(this);
                        text.push(that.attr("text"));
                        val.push(that.attr("val"));
                    });
                    showInput.val(text.join(DELIMITER));
                    targetInput.val(val.join(DELIMITER));
                    ngModelCtrl.$setViewValue(val.join(DELIMITER));
                });
                close.on("click", function () {
                    list.find("input").prop("checked", false);
                    has.children().remove();
                });
            }
            return {
                restrict: 'A',
                require: ['popChoice', '?ngModel'],
                priority: -100,
                link: link,
                controller: ctrl
            };
        }]);

    }

    return {
        version: "0.0.1",
        init: init
    }
});
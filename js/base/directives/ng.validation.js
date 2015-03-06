/**
 * Created by EX-TANXINZHENG001 on 2014/5/22.
 * use method:
 *  <input name="discountRatio" ng-validation="number:{rule:'0,14',decimal:2,negative:true,msg:'必须为小于14位且保留2位小数的数字'}}"
 *          ng-model="serPayDetail.discountRatio" type="text">
 * rule:
 *      msg:错误提示信息
 *      1.是否为空:
 *          require:{msg:'项目名称不能为空'}
 *      2.数字:
 *          rule:限制的长度; decimal:小数位，默认为0; negative:是否可输入负数,默认为false
 *          例：number:{rule:'0,14',decimal:2,negative:true,msg:'必须为小于14位且保留2位小数的数字'}
 *      3.长度:
 *          length:{rule:'0-300',msg:'XXX不能超过300字'}
 */
define(function () {
    var init = function(appModule){
        var VALIDATION_RULE = {
            require:"require",
            length:"length",
            unique:"unique",
            number:"number",
            date:'date'
        };
        var PATTERN_RULE = {
            number : function(min,max,negative,decimal){
                return new RegExp('^'+negative+'(([1-9][0-9]{'+min+','+max+'})|0)(\\.\\d{1,'+decimal+'})?$');
            },
            integer : function(min,max,negative){
                return new RegExp('^'+negative+'(([1-9][0-9]{'+min+','+max+'})|0)$');
            }
        };
        appModule.directive('ngValidation', ['$http', function ($http) {
            return {
                require: 'ngModel',
                link: function (scope, ele, attrs, ctrl) {
                    var formName = ele[0].form.name;
                    var form = scope[formName];
                    if(form.errors === undefined){
                        form.errors = {};
                    }
                    var valida = function(){
                        var ngValiation = attrs.ngValidation;
                        var rules = eval("("+ngValiation+")");
                        var val = ctrl.$viewValue;
                        var errorMsg = [];
                        for(var rule in rules){
                            var ruleMsg = rules[rule].msg;
                            var attrName = ctrl.$name;
                            switch (rule){
                                case VALIDATION_RULE.require:
                                    if(val == undefined || val == ""){
                                        errorMsg.push(ruleMsg);
                                    }
                                    break;
                                case VALIDATION_RULE.length:
                                    var length = rules[rule].rule.split('-');
                                    var min = parseInt(length[0]);
                                    var max = parseInt(length[1]);
                                    if(min>0 && (val == undefined || val == "")){
                                        errorMsg.push(ruleMsg);
                                    }else if(val !=undefined &&(
                                        val.length < min ||
                                        val.length > max)){
                                        errorMsg.push(ruleMsg);
                                    }
                                    break;
                                case VALIDATION_RULE.number:
                                    var nums = rules[rule].rule.split(',');
                                    var decimal = !isNaN(rules[rule].decimal) ? rules[rule].decimal : 0;
                                    var isNegative = rules[rule].negative === undefined ? false : rules[rule].negative;
                                    var negative = isNegative ? '-?' : '';
                                    var min = parseInt(nums[0]);
                                    var max = parseInt(nums[1]);
                                    var partner = null;
                                    if(decimal > 0){
                                        partner = PATTERN_RULE.number(min,max,negative,decimal)
                                    }else{
                                        partner = PATTERN_RULE.integer(min,max,negative);
                                    }
                                    if(val && !partner.test(val)){
                                        errorMsg.push(ruleMsg);
                                    }
                                    break;
                                case VALIDATION_RULE.date:
                                    var maxs = rules[rule].max;
                                    var mins = rules[rule].min;
                                    if(maxs!='' && maxs != undefined && val != undefined){
                                        var max = new Date(Date.parse(maxs.replace(/-/g, "/")));
                                        var date = new Date(Date.parse(val.replace(/-/g, "/")));
                                        if(!(date<=max)){
                                            errorMsg.push(ruleMsg);
                                        }
                                    }
                                    if(mins != '' && mins != undefined && val != undefined){
                                        var min = new Date(Date.parse(mins.replace(/-/g, "/")));
                                        var date = new Date(Date.parse(val.replace(/-/g, "/")));
                                        if(!(date>=min)){
                                            errorMsg.push(ruleMsg);
                                        }
                                    }
                                    break;
                                case VALIDATION_RULE.unique:
                                    /*var url = attrs.validUrl;
                                    $http({
                                        url:url,
                                        method:"POST",
                                        data:params
                                    }).success(function(data){
                                        if(!data.result){
                                            ctrl.errorMsg = ruleMsg;
                                            ctrl.$setValidity(MSG,false);
                                        }
                                    });*/
                                    break;
                                default :

                                    break;
                            }
                        }
                        if(errorMsg.length > 0){
                            form.errors[attrName] = errorMsg[0]
                            ctrl.$setValidity(attrName,false);
                        }else{
                            form.errors[attrName] = undefined;
                            ctrl.$setValidity(attrName,true);
                        }
                    };
                    scope.$watch(attrs.ngModel, function () {
                        valida();
                     });
                }
            }
        }]);
    };
    return {
        init:init
    };
});
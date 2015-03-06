/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块--列表控制器
 */
define(function(require){
	return ['$scope','$rootScope', 'BaseService','AppService','DictionaryFactory',
	    function ($scope,$rootScope,baseService,appService,dictionaryFactory) {
            /**
             * 查询支付方式：总额、人头、项目、病种
             * @param jsonObj
             * @param callback
             */
            $scope.paymentModeList = [];
            $scope.getPayModeList = function(){
                var params = {codeType:'paymentMode'};
                appService.getPayModeList(params,function(data){
                    $scope.paymentModeList = data.result;
                });
            };
            $scope.patternRule = hcpms.patternRule;
            $scope.logOut = function(){
                dialog.confirm("是否注销登录？",function(){
                    appService.logOut({},function(data){
                        if(data.state == "0"){
                            window.location.href = "login.htm";
                        }
                    },function(data,status){
                        window.location.href = "login.htm";
                    });
                });
            };
            $scope.getDataByCodeType = function(codeType){
                return baseService.getBaseCode(codeType);
            };
            $scope.isEquals = function(obj1,obj2){
                return hcpms.utils.isEquals(obj1,obj2);
            };
            $scope.isEmpty = function(obj){
                return hcpms.utils.isEmpty(obj);
            };
            $scope.isCheck = function(val,checkVal,prefix){
               return Utils.isCheck(val,checkVal,prefix);
            };
            $scope.getCheckedValue = function(ele,realValue,prefix){
                return Utils.getCheckedValue(ele,realValue,prefix);
            };
            var init = function(){
                $scope.getPayModeList();
            };
            init();
	    }
    ];
});
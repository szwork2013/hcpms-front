/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块-预授权方案控制器
 */
define(function(require){
	return  ['$scope', 'AgreementPreAuthService', '$routeParams',
	    function ($scope,agreementPreAuthService,$routeParams) {
            /** 变量定义--agreementDetail缓存对象*/
            $scope.oldPreAuthDetail = {};
            /** url请求参数对象*/
            $scope.UrlParams = $routeParams;
            $scope.preAuthListParam = {
                agreementId:$scope.UrlParams.id,
                page:"1",
                pageSize:"20"
            };
            /**
             * 预授权方案--查询明细
             * @param params
             */
            $scope.preAuthId = "";
            $scope.preAuthDetail = {};
            $scope.getPreAuthDetail = function(e){
                $scope.preAuthId = e.target.id;
                var params = {id:$scope.preAuthId};
                agreementPreAuthService.getPreAuthDetail(params,function(data){
                    $scope.preAuthDetail = data.result;
                });
            };
            /**
             * 预授权方案--查询列表
             * @param params
             */
            $scope.preAuthList = {};
            $scope.queryPreAuthList = function(){
                var pageInfo = $scope.pageInfo;
                var params = $scope.preAuthListParam;
                if(null == params.itemType){
                	delete params.itemType;
                }
                params.page = pageInfo&&pageInfo.curPage ||  params.page;
                params.pageSize = pageInfo&&pageInfo.limit || params.pageSize;
                agreementPreAuthService.queryPreAuthList(params,function(data){
                    $scope.preAuthList = data.result;
                    //配置分页参数
                    $scope.pageInfo = {
                        curPage:params.page,
                        total:data.totals.total,
                        limit: params.pageSize,
                        loadData:$scope.queryPreAuthList
                    };
                });
            };
            /**
             * 预授权方案--修改
             * @param params
             */
            $scope.updatePreAuth = function(dialogObj){
                var params = $scope.preAuthDetail;
                params.agreementId = $scope.UrlParams.id;
                agreementPreAuthService.updatePreAuth(params,function(data){
                    dialog.alert(data.msg,function(){
                        dialogObj.hide();
                    });
                    $scope.queryPreAuthList();
                });
            };
            $scope.resetPreAuthDetail = function(){
                if(confirm('是否取消修改的数据？')){
                    $scope.resetPreAuthDetail = angular.copy($scope.oldPreAuthDetail);
                }
            };
            /**
             * 预授权方案--清空明细
             */
            $scope.clean = function(){
                $scope.gloSubmitted05 = false;
                $scope.preAuthId = "";
                $scope.preAuthDetail = {};
            };
            $scope.addPreAuth = function(dialogObj){
                var params = $scope.preAuthDetail;
                params.agreementId = $scope.UrlParams.id;
                agreementPreAuthService.addPreAuth(params,function(data){
                    dialog.alert(data.msg,function(){
                        dialogObj.hide();
                    });
                    $scope.queryPreAuthList();
                });
            };
            /**
             * 预授权方案列表--删除
             * @param params
             */

            $scope.deletePreAuth = function(){
                var params = {id:$scope.preAuthIdList};
                dialog.confirm('是否删除选中项？',function(){
                    agreementPreAuthService.deletePreAuth(params,function(data){
                        dialog.alert(data.msg);
                        $scope.preAuthIdList ="";
                        document.getElementById('preAuthIdList').checked = false;
                        $scope.queryPreAuthList($scope.preAuthListParam);
                    });
                });
            };

            $scope.autoSearch03 = function($event){
                if($scope.preAuthDetail.itemType == '2'){
                    var code =  $event.target.name;
                    var codeNo = "";
                    var codeName = "";
                    if('itemCode' == code){
                        codeNo = $scope.preAuthDetail.itemCode;
                    }else if('itemName' == code){
                        codeName = $scope.preAuthDetail.itemName;
                    }
                    var params = {codeType:"diagnosistreat",codeNo:codeNo,codeName:codeName};
                    if((codeNo && hcpms.utils.trim(codeNo)) || (codeName && hcpms.utils.trim(codeName))){                        agreementPreAuthService.search(params,function(data){
                            if(data.result.length > 0){
                                $scope.preAuthDetail.itemCode = data.result[0].codeNo;
                                $scope.preAuthDetail.itemName = data.result[0].codeName;
                            }
                        });
                    }
                }
            };
            /**
             * 列表复选框--全选控制
             * @type {{}}
             */
            $scope.preAuthIdList="";
            $scope.getPreAuthList= function(domName,isArray,prefix){
                $scope.preAuthIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };

           /**
           *判断是否执行修改、添加操作
           * */
            $scope.gloSubmitted05 = false;
            $scope.savepreAuth = function(isValid,popId){
                var dialogObj = $("#"+popId).data("dialog");
                if(isValid) {
                    if ($scope.preAuthId) {
                        $scope.updatePreAuth(dialogObj);
                    } else {
                        $scope.addPreAuth(dialogObj);
                    }
                }else
                {
                    $scope.gloSubmitted05= true;
                }
            }
	    }
    ];
});
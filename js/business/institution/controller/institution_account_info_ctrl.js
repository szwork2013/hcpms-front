/**
 * Created by EX-TANXINZHENG001 on 2014/5/14.
 */
define(function(require){
    return ['$scope', 'BaseService','$routeParams','InstitutionAccountInfoService',
        function ($scope,baseService,$routeParams,institutionAccountInfoService) {
            $scope.UrlParams = $routeParams;
            $scope.queryAccountInfoListParams = {
                page:"1",
                pageSize:"20",
                providerid:$scope.UrlParams.id
            };
            // 帐户删除操作--参数
            $scope.accountInfoIdList = "";
            $scope.$on('isUpdateAccount',function(event,msg){
            	if(msg){
            		init();
            	}
            });
            // 帐户列表查询操作--结果
            $scope.institutionAccountInfoList = {};
            /**
             * 帐户列表--查询
             * @param params
             */
            $scope.queryAccountInfoList = function(){
                var pageInfo = $scope.pageInfo;
                var params = $scope.queryAccountInfoListParams;
                params.page = pageInfo&&pageInfo.curPage ||  params.page;
                params.pageSize = pageInfo&&pageInfo.limit || params.pageSize;
                institutionAccountInfoService.queryAccountInfoList(params,function(data){
                    $scope.institutionAccountInfoList = data.result;
                    //配置分页参数
                    $scope.pageInfo = {
                        curPage:params.page,
                        total:data.totals.total,
                        limit: params.pageSize,
                        isShow : true,
                        loadData:$scope.queryAccountInfoList
                    };
                });
            };
            /**
             * 帐户信息--新增
             */
            $scope.accountInfoDetail = {};
            $scope.addAccountInfo = function(dialogObj){
                var params = $scope.accountInfoDetail;
                params.providerid = $scope.UrlParams.id;
                institutionAccountInfoService.addAccountInfo(params,function(data){
                	   dialog.alert(data.msg,function(){
                           dialogObj.hide();
                       });
                    $scope.queryAccountInfoList();
                });
            };
            /**
             * 帐户信息--修改
             */
            $scope.updateAccountInfo = function(dialogObj){
                var params = $scope.accountInfoDetail;
                params.id = $scope.accountInfoId;
                institutionAccountInfoService.updateAccountInfo(params,function(data){
                	   dialog.alert(data.msg,function(){
                           dialogObj.hide();
                       });
                    $scope.queryAccountInfoList();
                });
            };
            /**
             * 帐户信息--删除
             */
            $scope.deleteAccountInfo = function(params){
            	dialog.confirm("您确认删除？",function(){
            	
                    var params = {id:$scope.accountInfoIdList};
                    institutionAccountInfoService.deleteAccountInfo(params,function(data){
                    	dialog.alert(data.msg);
                    	   $scope.accountInfoIdList ="";
                           document.getElementById('accountInfoIdList').checked = false;
                        $scope.queryAccountInfoList();
                    });
            	})
            
            };
            /**
             * 帐户信息--查询明细
             * @param params
             */
            $scope.accountInfoId = "";
            $scope.getAccountInfoDetail = function(e){
                $scope.accountInfoId = e.target.id;
                var params = {id:$scope.accountInfoId};
                institutionAccountInfoService.getAccountInfoDetail(params,function(data){
                    $scope.accountInfoDetail = data.result;
                });
            };
            /**
             * 帐户信息--保存或新增
             */
            $scope.submitted = false;
            $scope.saveAccountInfo = function(isValid,dialog){
            	var dialogObj = $("#"+dialog).data("dialog");
                if(isValid){
                    if($scope.accountInfoId){
                        $scope.updateAccountInfo(dialogObj);
                    }else{
                        $scope.addAccountInfo(dialogObj);
                    }
                }else{
                    $scope.submitted = true;
                }
            };
            /**
             * 帐户信息--清空明细
             */
            $scope.clean = function(){
                $scope.submitted = false;
                $scope.accountInfoId = "";
                $scope.accountInfoDetail = {};
            };
            /**
             * 列表复选框--全选控制
             * @param domName
             * @param isArray
             * @param prefix
             */
            $scope.getAccountInfoIdList = function(domName,isArray,prefix){
                $scope.accountInfoIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };
            
            /**
             * 初始化操作
             */
            var init = function(){
                if($scope.UrlParams.id){
                	 $scope.queryAccountInfoList();
                }
            };
            init();
        }
    ];
});
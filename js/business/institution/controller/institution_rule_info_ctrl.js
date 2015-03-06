/**
 * Created by EX-TANXINZHENG001 on 2014/5/14.
 */
define(function(require){
    return ['$scope', 'BaseService','$routeParams','InstitutionRuleInfoService',
        function ($scope,baseService,$routeParams,institutionRuleInfoService) {
            $scope.UrlParams = $routeParams;
            $scope.queryRuleInfoListParams = {
                page:"1",
                pageSize:"20",
                providerid:$scope.UrlParams.id
            };
            $scope.UrlParams = $routeParams;
            // 违规删除操作--参数
            $scope.ruleInfoIdList = "";
            $scope.$on('isUpdateRuleInfo',function(event,msg){
            	if(msg){
            		init();
            	}
            });
            // 违规列表查询操作--结果
            $scope.institutionRuleInfoList = {};
            /**
             * 协议列表--查询
             * @param params
             */
            $scope.queryRuleInfoList = function(){
                var pageInfo = $scope.pageInfo;
                var params = $scope.queryRuleInfoListParams;
                params.page = pageInfo&&pageInfo.curPage ||  params.page;
                params.pageSize = pageInfo&&pageInfo.limit || params.pageSize;
                institutionRuleInfoService.queryRuleInfoList(params,function(data){
                    $scope.institutionRuleInfoList = data.result;
                    //配置分页参数
                    $scope.pageInfo = {
                        curPage:params.page,
                        total:data.totals.total,
                        limit: params.pageSize,
                        isShow : true,
                        loadData:$scope.queryRuleInfoList
                    };
                });
            };
            /**
             * 违规信息--新增
             */
            $scope.ruleInfoDetail = {};
            $scope.addRuleInfo = function(dialogObj){
                var params = $scope.ruleInfoDetail;
                params.providerid = $scope.UrlParams.id;
                institutionRuleInfoService.addRuleInfo(params,function(data){
                    dialog.alert(data.msg,function(){
                        dialogObj.hide();
                    });
                    $scope.queryRuleInfoList();
                });
            };
            $scope.updateRuleInfo = function(dialogObj){
                var params = $scope.ruleInfoDetail;
                params.breachid = $scope.ruleInfoId;
                institutionRuleInfoService.updateRuleInfo(params,function(data){
                    dialog.alert(data.msg,function(){
                        dialogObj.hide();
                    });
                    $scope.queryRuleInfoList();
                });
            };
            /**
             * 违规信息--删除
             */
            $scope.deleteRuleInfo = function(params){
            	dialog.confirm("您确认删除？",function(){
                    var params = {id:$scope.ruleInfoIdList};
                    institutionRuleInfoService.deleteRuleInfo(params,function(data){
                        dialog.alert(data.msg);
                   	   $scope.ruleInfoIdList ="";
                       document.getElementById('ruleInfoIdList').checked = false;
                        $scope.queryRuleInfoList();
                    });
            	})
            
            };
            /**
             * 列表复选框--全选控制
             * @param domName
             * @param isArray
             * @param prefix
             */
            $scope.getRuleInfoIdList = function(domName,isArray,prefix){
                $scope.ruleInfoIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };
            /**
             * 违规信息--查询明细
             * @param params
             */
            $scope.ruleInfoId = "";
            $scope.getRuleInfoDetail = function(e){
                $scope.ruleInfoId = e.target.id;
                var params = {breachid:$scope.ruleInfoId};
                institutionRuleInfoService.getRuleInfoDetail(params,function(data){
                    $scope.ruleInfoDetail = data.result;
                });
            };
            /**
             * 违规信息--保存或新增
             */
            $scope.ruleSubmitted = false;
            $scope.saveRuleInfo = function(isValid,dialog){
            	var dialogObj = $("#"+dialog).data("dialog");
                if(isValid) {
                	 if($scope.ruleInfoId){
                         $scope.updateRuleInfo(dialogObj);
                     }else{
                         $scope.addRuleInfo(dialogObj);
                     }
                }else
                {
                    $scope.ruleSubmitted = true;
                }
            };
            /**
             * 违规信息--清空明细
             */
            $scope.clean = function(){
                $scope.ruleSubmitted = false;
                $scope.ruleInfoId = "";
                $scope.ruleInfoDetail = {};
            };
            
            /**
             * 初始化操作
             */
            var init = function(){
                if($scope.UrlParams.id){
                	 $scope.queryRuleInfoList();
                }
            };
            init();
        }
    ];
});
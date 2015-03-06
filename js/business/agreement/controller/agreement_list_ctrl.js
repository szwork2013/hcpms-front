/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块--列表控制器
 */
define(function(require){
	return ['$scope', 'BaseService','$routeParams','AgreementService',
        function ($scope,baseService,$routeParams,agreementService) {
            $scope.oldAgreementDetail={};
            /**
             * @description     url参数请求对象
             */
            $scope.UrlParams = $routeParams;
            /**
             * @description    ID数组全选缓存对象
             *  @see             协议列表--删除
             * @type {{}}
             */
            $scope.agreementIdList = "";
            $scope.agreementListParam = {
                page:"1",
                pageSize:"20"
            };
            /**
             * 协议列表--查询
             * @param params
             */
            $scope.queryAgreementList = function(){
                var pageInfo = $scope.pageInfo;
                var params = $scope.agreementListParam;
                params.page = pageInfo&&pageInfo.curPage ||  params.page;
                params.pageSize = pageInfo&&pageInfo.limit || params.pageSize;
                agreementService.query(params,function(data){
                    $scope.agreementList = data.result;
                    //配置分页参数
                    $scope.pageInfo = {
            				curPage:params.page,
            				total:data.totals.total,
            				limit: params.pageSize,
            				loadData:$scope.queryAgreementList
                    };
                });
            };
            $scope.cleanAgreement = function(){
                $scope.agreementDetail = {};
            };
            /**
             * 协议列表--删除
             * @param params
             */
            $scope.deleteAgreementList = function(){
                var params = {id:$scope.agreementIdList};
                dialog.confirm('是否删除选中项？',function(){
                    agreementService.remove(params,function(data){
                        dialog.alert(data.msg);
                        $scope.agreementIdList ="";
                        document.getElementById('agreementIdList').checked = false;
                        $scope.queryAgreementList($scope.agreementListParam);
                    });
                });
            };
            /**
             * 查询支付方式：总额、人头、项目、病种
             * @param params
             */
            $scope.getAgreementPayMode = function(){
                agreementService.payMode(function(data){
                    $scope.paymentModeList = data.result;
                });
            };
            /**
             * 协议列表--新增
             * @param params
             */
            $scope.agreementDetail = {};
            $scope.addAgreementList = function(){
                var params = $scope.agreementDetail;
                agreementService.create(params,function(data){
                	dialog.alert(data.msg);
                    $scope.queryAgreementList($scope.agreementListParam);
                });
            };
            $scope.resetAgreementDetail = function(){
                if(confirm('是否取消添加的数据？')){
                    $scope.agreementDetail = angular.copy($scope.oldAgreementDetail);
                }
            };
            /**
             * 列表复选框--全选控制
             * @type {{}}
             */
            $scope.getAgreementIdList = function(domName,isArray,prefix){
                $scope.agreementIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };
	    }
    ];
});
/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块--列表控制器
 */
define(function(require){
	return ['$scope', 'BaseService','$routeParams','PerformanceViewService',
        function ($scope,baseService,$routeParams,performanceViewService) {
            /**
             * @description     url参数请求对象
             */
            $scope.UrlParams = $routeParams;
            $scope.viewParam = {
                page:"1",
                pageSize:"20"
            };
            /**
             * 协议列表--查询
             * @param params
             */
            $scope.getViewList = function(){
                var pageInfo = $scope.pageInfo;
                var params = $scope.viewParam;
                params.page = pageInfo&&pageInfo.curPage ||  params.page;
                params.pageSize = pageInfo&&pageInfo.limit || params.pageSize;
                performanceViewService.query(params,function(data){
                    $scope.performanceViewList = data.result;
                    //配置分页参数
                    $scope.pageInfo = {
            				curPage:params.page,
            				total:data.totals.total,
            				limit: params.pageSize,
            				isShow : true,
            				loadData:$scope.getViewList
                    };
                });
            };
	    }
    ];
});
/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块-明细控制器
 */
define(function(require){
	return  ['$scope', 'ReportService','$location','$routeParams',
	    function ($scope,reportService,$location,$routeParams) {
            /** url请求参数对象*/
            $scope.UrlParams = $routeParams;
            $scope.pondListParam = {
                page:"1",
                pageSize:"20"
            };
            $scope.pondList = {};
            $scope.queryPondList = function(){
                var pageInfo = $scope.pageInfo;
                var params = $scope.pondListParam;
                params.page = pageInfo&&pageInfo.curPage ||  params.page;
                params.pageSize = pageInfo&&pageInfo.limit || params.pageSize;
                reportService.queryPondList(params,function(data){
                    $scope.pondList = data.result;
                    //配置分页参数
                    $scope.pageInfo = {
                        curPage:params.page,
                        total:data.totals.total,
                        limit: params.pageSize,
                        loadData:$scope.queryPondList
                    };
                });
            };
            var init = function(){

            };
            init();
	    }
    ];
});
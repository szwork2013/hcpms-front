/**
 * Created by EX-TANXINZHENG001 on 2014/5/14.
 */
define(function(require){
    return ['$scope', 'BaseService','$routeParams','DiagnosisListService',
        function ($scope,baseService,$routeParams,diagnosisListService) {
            /**
             * 诊疗列表--查询
             * @param params
             */
            $scope.queryDiagnosisList = function(){
                var pageInfo = $scope.pageInfo;
                var params = {
                    page : pageInfo&&pageInfo.curPage || "1",
                    pageSize : pageInfo&&pageInfo.limit || "20"
                };
                DiagnosisListService.query(params,function(data){
                    $scope.institutionList = data.result;
                    //配置分页参数
                    $scope.pageInfo = {
                        curPage:params.page,
                        total:data.totals.total,
                        limit: params.pageSize,
                        isShow : true,
                        loadData:$scope.queryDiagnosisList
                    };
                });
            };
        }
    ];
});
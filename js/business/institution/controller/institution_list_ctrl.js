/**
 * Created by EX-TANXINZHENG001 on 2014/5/14.
 */
define(function(require){
    return ['$scope', 'BaseService','$routeParams','InstitutionListService',
        function ($scope,baseService,$routeParams,institutionListService) {
            /**
             * 机构列表--查询
             * @param params
             */
            $scope.UrlParams = $routeParams;
            $scope.institutionListParam = {
                page:"1",
                pageSize:"20"
            };
            $scope.institutionList={};
            $scope.queryInstitutionList = function(){
                var pageInfo = $scope.pageInfo;
                var params = $scope.institutionListParam;
                params.page = pageInfo&&pageInfo.curPage ||  params.page;
                params.pageSize = pageInfo&&pageInfo.limit || params.pageSize;
                institutionListService.query(params,function(data){
                    $scope.institutionList = data.result;
                    //配置分页参数
                    $scope.pageInfo = {
                        curPage:params.page,
                        total:data.totals.total,
                        limit: params.pageSize,
                        loadData:$scope.queryInstitutionList
                    };
                });
            };
            /**
             * 机构详细信息--新增
             * @param params
             */
            $scope.institutionDetail = {};
            $scope.addProvider = function(){
                var params = $scope.institutionDetail;
                institutionListService.createProvider(params,function(data){
                    alert(data.msg);
                });
            };

            /**
             * 列表复选框--全选控制
             * @type {{}}
             */
            $scope.institutionIdList = "";
            $scope.getInstitutionIdList = function(domName,isArray,prefix){
                $scope.institutionIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };

            /**
             *机构列表--删除
             * @param params
             */
            $scope.deleteInstitutionList = function(){
              	dialog.confirm("确认要删除该医院信息吗？若删除，其相关的医疗设备、违规、联系信息、账号信息、诊疗项目、医生信息也将一并被删除！",function(){
                    var params = {ids:$scope.institutionIdList};
                    institutionListService.deleteInstitutionList(params,function(data){
                    	dialog.alert(data.msg);
                    	  $scope.institutionIdList ="";
                          document.getElementById('institutionIdList').checked = false;
                        $scope.queryInstitutionList($scope.agreementListParam);
                    });
              	})
            
            };
        }
    ];
});
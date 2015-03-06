/**
 * Created by EX-TANXINZHENG001 on 2014/5/14.
 */
define(function(require){
    return ['$scope', 'BaseService','$routeParams','InstitutionRelationService',
        function ($scope,baseService,$routeParams,institutionRelationService) {
            $scope.UrlParams = $routeParams;
            $scope.queryRelationListParams = {
                page:"1",
                pageSize:"20",
                providerid:$scope.UrlParams.id
            };
            // 违规新增操作--参数
            $scope.relationDetail = {};
            // 违规删除操作--参数
            $scope.relationIdList = "";
            $scope.$on('isUpdateRelation',function(event,msg){
            	if(msg){
            		init();
            	}
            });
            // 违规列表查询操作--结果
            $scope.institutionRelationList = {};
            /**
             * 协议列表--查询
             * @param params
             */
            $scope.queryRelationList = function(){
                var pageInfo = $scope.pageInfo;
                var params = $scope.queryRelationListParams;
                params.page = pageInfo&&pageInfo.curPage ||  params.page;
                params.pageSize = pageInfo&&pageInfo.limit || params.pageSize;
                institutionRelationService.queryRelationList(params,function(data){
                    $scope.institutionRelationList = data.result;
                    //配置分页参数
                    $scope.pageInfo = {
                        curPage:params.page,
                        total:data.totals.total,
                        limit: params.pageSize,
                        isShow : true,
                        loadData:$scope.queryRelationList
                    };
                });
            };
            /**
             * 违规信息--新增
             */
            $scope.relationDetail = {};
            $scope.addRelation = function(dialogObj){
                var params = $scope.relationDetail;
                params.providerid = $scope.UrlParams.id;
                institutionRelationService.addRelation(params,function(data){
                	   dialog.alert(data.msg,function(){
                           dialogObj.hide();
                       });
                    $scope.queryRelationList();
                });
            };
            /**
             * 违规信息--修改
             */
            $scope.updateRelation = function(dialogObj){
                var params = $scope.relationDetail;
                params.id = $scope.relationId;
                institutionRelationService.updateRelation(params,function(data){
                	   dialog.alert(data.msg,function(){
                           dialogObj.hide();
                       });
                    $scope.queryRelationList();
                });
            };
            /**
             * 违规信息--删除
             */
            $scope.deleteRelation = function(params){
            	dialog.confirm("您确认删除？",function(){
                    var params = {id:$scope.relationIdList};
                    institutionRelationService.deleteRelation(params,function(data){
                    	dialog.alert(data.msg);
                   	   $scope.relationIdList ="";
                       document.getElementById('relationIdList').checked = false;
                        $scope.queryRelationList();
                    });
            	})
            };
            /**
             * 违规信息--查询明细
             * @param params
             */
            $scope.relationId = "";
            $scope.getRelationDetail = function(e){
                $scope.relationId = e.target.id;
                var params = {id:$scope.relationId};
                institutionRelationService.getRelationDetail(params,function(data){
                    $scope.relationDetail = data.result;
                });
            };
            /**
             * 违规信息--保存或新增
             */
            $scope.submitted = false;
            $scope.saveRelation = function(isValid,dialog){
            	var dialogObj = $("#"+dialog).data("dialog");
                if(isValid) {
                    if ($scope.relationId) {
                        $scope.updateRelation(dialogObj);
                    } else {
                        $scope.addRelation(dialogObj);
                    }
                }else{
                    $scope.submitted = true;
                }
            };
            /**
             * 违规信息--清空明细
             */
            $scope.clear = function(){
                $scope.submitted = false;
                $scope.relationId = "";
                $scope.relationDetail = {};
            };
            /**
             * 列表复选框--全选控制
             * @param domName
             * @param isArray
             * @param prefix
             */
            $scope.getRelationIdList = function(domName,isArray,prefix){
                $scope.relationIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };
            
          
            $scope.$watch("relationDetail.department1",function(newVal,oldVal){
            	var department1 = $scope.relationDetail.department1;
            	$scope.display = 'bbbb' === newVal ? false:true;
            })
            
               $scope.$watch("relationDetail.department2",function(newVal,oldVal){
            	var department1 = $scope.relationDetail.department1;
            	if('bbbb' === department1){
            		$scope.relationDetail.department = $scope.relationDetail.department2
            	}else{
            		$scope.relationDetail.department = "";
            	}
            })
            /**
             * 初始化操作
             */
            var init = function(){
                if($scope.UrlParams.id){
                	 $scope.queryRelationList();
                }
            };
            init();
        }
    ];
});
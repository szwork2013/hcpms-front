/**
 * Created by EX-TANXINZHENG001 on 2014/5/14.
 */
define(function(require){
    return ['$scope', 'BaseService','$routeParams','InstitutionDoctorInfoService',
        function ($scope,baseService,$routeParams,institutionDoctorInfoService) {
            $scope.UrlParams = $routeParams;
            $scope.queryDoctorInfoListParams = {
                page:"1",
                pageSize:"20",
                providerid:$scope.UrlParams.id
            };
            // 医生删除操作--参数
            $scope.doctorInfoIdList = "";
            // 医生列表查询操作--结果
            $scope.institutionDoctorInfoList = {};
            /**
             * 医生列表--查询
             * @param params
             */
            $scope.queryDoctorInfoList = function(){
                var pageInfo = $scope.pageInfo;
                var params = $scope.queryDoctorInfoListParams;
                params.page = pageInfo&&pageInfo.curPage ||  params.page;
                params.pageSize = pageInfo&&pageInfo.limit || params.pageSize;
                institutionDoctorInfoService.queryDoctorInfoList(params,function(data){
                    $scope.institutionDoctorInfoList = data.result;
                    //配置分页参数
                    $scope.pageInfo = {
                        curPage:params.page,
                        total:data.totals.total,
                        limit: params.pageSize,
                        isShow : true,
                        loadData:$scope.queryDoctorInfoList
                    };
                });
            };
            /**
             * 医生信息--新增
             */
            $scope.doctorInfoDetail = {};
            $scope.addDoctorInfo = function(dialogObj){
                var params = $scope.doctorInfoDetail;
                params.providerid = $scope.UrlParams.id;
                institutionDoctorInfoService.addDoctorInfo(params,function(data){
                	  dialog.alert(data.msg,function(){
                          dialogObj.hide();
                      });
                    $scope.queryDoctorInfoList();
                });
            };
            /**
             * 医生信息--修改
             */
            $scope.updateDoctorInfo = function(dialogObj){
                var params = $scope.doctorInfoDetail;
                params.id = $scope.doctorInfoId;
                institutionDoctorInfoService.updateDoctorInfo(params,function(data){
                	  dialog.alert(data.msg,function(){
                          dialogObj.hide();
                      });
                    $scope.queryDoctorInfoList();
                });
            };
            /**
             * 医生信息--删除
             */
            $scope.deleteDoctorInfo = function(params){
            	dialog.confirm("您确认删除？",function(){
                    var params = {id:$scope.doctorInfoIdList};
                    institutionDoctorInfoService.deleteDoctorInfo(params,function(data){
                    	dialog.alert(data.msg);
                   	   $scope.doctorInfoIdList ="";
                       document.getElementById('doctorInfoIdList').checked = false;
                        $scope.queryDoctorInfoList();
                    });
            	})
          
                
            };
            /**
             * 医生信息--查询明细
             * @param params
             */
            $scope.doctorInfoId = "";
            $scope.getDoctorInfoDetail = function(e){
                $scope.doctorInfoId = e.target.id;
                var params = {id:$scope.doctorInfoId};
                institutionDoctorInfoService.getDoctorInfoDetail(params,function(data){
                    $scope.doctorInfoDetail = data.result;
                });
            };
            /**
             * 医生信息--保存或新增
             */
            $scope.doctorsubmitted = false;
            $scope.saveDoctorInfo = function(isValid,dialog){
            	var dialogObj = $("#"+dialog).data("dialog");
                if(isValid){
                    if($scope.doctorInfoId){
                        $scope.updateDoctorInfo(dialogObj);
                    }else{
                        $scope.addDoctorInfo(dialogObj);
                    }
                }else{
                    $scope.doctorsubmitted = true;
                }
            };
            /**
             * 医生信息--清空明细
             */
            $scope.clean = function(){
            	   $scope.doctorsubmitted = false;
                $scope.doctorInfoId = "";
                $scope.doctorInfoDetail = {};
            };
            /**
             * 列表复选框--全选控制
             * @param domName
             * @param isArray
             * @param prefix
             */
            $scope.getDoctorInfoIdList = function(domName,isArray,prefix){
                $scope.doctorInfoIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };
        }
    ];
});
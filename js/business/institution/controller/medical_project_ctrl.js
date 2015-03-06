/**
 * CreatedBy: 	wh
 * CreateDate:	2014-05-16
 * Email:		ex-wanghua001@pingan.com.cn
 * Version:		0.0.1
 * Description:	医疗项目模块--列表控制器
 */
define(function(require){
	return ['$scope', 'BaseService','$routeParams','MedicalProjectService',
        function ($scope,baseService,$routeParams,medicalProjectService) {
            /**
             * @description     url参数请求对象
             */
            $scope.UrlParams = $routeParams;
            /**
             * @description     存放所有的checkBox的值
             * @type {Array}
             */
            $scope.oldSelAttrs = [];
            /**
             * @description    ID数组全选缓存对象
             *  @see             协议列表--删除
             * @type {{}}
             */
            $scope.medicalProjectIdList = "";
            $scope.medicalProjectListParam = {
        		page:"1",
                pageSize:"20",
                providerid:$scope.UrlParams.id
            }
            /**
             * 协议列表--查询
             * @param params
             */
            $scope.queryMedicalProjectList = function(){
                var pageInfo = $scope.pageInfo;
                var params = $scope.medicalProjectListParam;
                params.page = pageInfo&&pageInfo.curPage ||  params.page;
                params.pageSize = pageInfo&&pageInfo.limit || params.pageSize;
                medicalProjectService.query(params,function(data){
                    $scope.medicalProjectList = data.result;
                    //配置分页参数
                    $scope.pageInfo = {
            				curPage:params.page,
            				total:data.totals.total,
            				limit: params.pageSize,
            				isShow : true,
            				loadData:$scope.queryMedicalProjectList
                    };
                });
            };

            /**
             * 医疗项目列表--新增
             * @param params
             */
            $scope.addMedicalProjectList = function(dialogObj){
                var params = $scope.medicalProjectDetail;
                params.providerid = $scope.UrlParams.id;
                medicalProjectService.create(params,function(data){
                	   dialog.alert(data.msg,function(){
                           dialogObj.hide();
                       });
                	   $scope.queryMedicalProjectList();
                });
            };

            /**
             * 医疗项目信息--修改
             * @param params
             */
            $scope.updateMedicalProject = function(dialogObj){
                var params = $scope.medicalProjectDetail;
                medicalProjectService.update(params,function(data){
                	   dialog.alert(data.msg,function(){
                           dialogObj.hide();
                       });
                    $scope.queryMedicalProjectList();
                    
                });
            };

            /**
             * 医疗项目列表--删除
             * @param params
             */
            $scope.deleteMedicalProjectList = function(params){
             	dialog.confirm("您确认删除？",function(){
                    var params = {id:$scope.medicalProjectIdList};
                    medicalProjectService.remove(params,function(data){
                    	dialog.alert(data.msg);
                   	   $scope.medicalProjectIdList ="";
                       document.getElementById('medicalProjectIdList').checked = false;
                        $scope.queryMedicalProjectList($scope.medicalProjectListParam);
                    });
             	})
            
            };

            /**
             * 医疗项目信息--查询
             * @param params
             */
            $scope.detailMedicalProject = function(params){
                params = {id:params};
                medicalProjectService.show(params,function(data){
                    $scope.medicalProjectDetail = data.result;
                    $scope.oldmedicalProjectDetail = angular.copy($scope.medicalProjectDetail);
                });
            };

            /**
             * 列表复选框--全选控制
             * @type {{}}
             */
            $scope.getMedicalProjectIdList = function(domName,isArray,prefix){
                $scope.medicalProjectIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };

            /**
             *判断是否执行修改、添加操作
             * */
            $scope.itemId = {};
            $scope.setDialogItemId = function(id){
                $scope.itemId = id;
                console.log(id);
                $scope.detailMedicalProject(id);
            };
            $scope.clean = function(){
                $scope.submitted = false;
                $scope.itemId = "";
                $scope.medicalProjectDetail = {};
            };
            $scope.submitted = false;
            $scope.saveMedicalDetail = function(isValid,dialog){
            	var dialogObj = $("#"+dialog).data("dialog");
            	if( $scope.isUniqueProjectCode){
            		document.getElementById("treatCode").focus(); 
            		return;
            	}
                if(isValid){
                    if($scope.itemId){
                        $scope.updateMedicalProject(dialogObj);
                    }else{
                        $scope.addMedicalProjectList(dialogObj);
                    }
                }else{
                    $scope.submitted = true;
                }
            }
            
            $scope.isUniqueProjectCode = false;
            $scope.isAuto = false;
            $scope.autoSearchMedical = function($event){
            	var id = $scope.medicalProjectDetail.id;
                var codeNo = $scope.medicalProjectDetail.treatCode;
                var params = {codeType:"diagnosistreat2",codeNo:codeNo};
                var params2 = angular.copy($scope.medicalProjectListParam);
                params2.treatCode = codeNo;
                if(codeNo && !($scope.itemId)){
                	medicalProjectService.query(params2,function(data){
                		$scope.isAuto = true;
                        if(data.result.length!=0){
                        	$scope.isUniqueProjectCode = true;
                        	document.getElementById("treatCode").focus(); 
                        }else{
                        	$scope.isUniqueProjectCode = false;
                    		medicalProjectService.search(params,function(data){
                                if(data.result){
                                	$scope.medicalProjectDetail= data.result;
                                	$scope.medicalProjectDetail.id = id;
                              
                               }
                            });
                       }
                    });
                }
            };

            /**
             * 初始化操作
             */
            var init = function(){
                var id = $scope.id;
                //$scope.detailMedicalProject(id);
            };
            init();
	    }
    ];
});
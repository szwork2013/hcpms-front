/**
 * Created by EX-CHENYONGHONG001 on 2014/5/15.
 */
/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块-明细控制器
 */
define(function(require){
    return  ['$scope', 'InstitutionDetailService','$location','$routeParams',
        function ($scope,institutionDetailService,$location,$routeParams) {
            /** 变量定义--institutionDetail缓存对象*/
            $scope.oldInstitutionDetail = {};
            /** url请求参数对象*/
            $scope.UrlParams = $routeParams;
            
            /**
             * 机构详细信息--新增或修改
             */
            $scope.insSubmitted = false;
            $scope.saveProviderDetail = function(isValid){
                if(isValid) {
                    if($scope.UrlParams.id){
                        $scope.updateProviderDetail();
                    }else{
                        $scope.addProvider();
                    }
                }else
                {
                    $scope.insSubmitted = true;
                }
            };
            /**
             * 机构详细信息--查询
             */
            $scope.queryProviderDetail = function(){
            	var params = $scope.UrlParams;
                institutionDetailService.queryProviderDetail(params,function(data){
                    $scope.institutionDetail = data.result;
                    $scope.oldInstitutionDetail = angular.copy($scope.institutionDetail);
                });
            };
            /**
             * 机构详细信息--修改
             */
            $scope.updateProviderDetail = function(){
             
                $scope.institutionDetail.providerid = $scope.UrlParams.id;
                var params = $scope.institutionDetail;
                institutionDetailService.updateProviderDetail(params,function(data){
                    //$scope.institutionDetail.$error = angular.extend();
                	dialog.alert(data.msg);
                });
            };
            /**
             * 机构详细信息--新增
             */
            $scope.addProvider = function(){
                var params = $scope.institutionDetail;
                institutionDetailService.createProvider(params,function(data){
                    if(data.state == '0'){
                        $scope.UrlParams.id = data.result;
                    }
                    dialog.alert(data.msg);
                });
            };
            $scope.resetProvider = function(){
                if(confirm('是否取消修改的数据？')){
                    $scope.institutionDetail = angular.copy($scope.oldInstitutionDetail);
                }
            };
            $scope.imgIdList = "";
            $scope.deleteImgList = function(params){
               	dialog.confirm("您确认删除？",function(){
                    var params = {id:$scope.imgIdList};
                    institutionDetailService.deleteImgList(params,function(data){
                    	dialog.alert(data.msg);
                        $scope.queryImgList();
                    });
            	})
        
            };
            $scope.queryImgList = function(){
            	var params = {businessNo:$scope.institutionDetail.providerid};
            	institutionDetailService.queryImgList(params,function(data){
            		$scope.institutionDetail.imgList = data.result.imgList;
            	})
            }
            $scope.getImgInfo = function($event,index,fileName){
                var target = $event.target;
                var params = {downloadFlag:'Y',index:index,name:fileName};
                institutionDetailService.getImgInfo(params,function(data){
                    document.getElementById("downloadURL").src = data.result.url;
                });
            };
            /**
             * 列表复选框--全选控制
             * @type {{}}
             */

            $scope.getImgIdList = function(domName,isArray,prefix){
                $scope.imgIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };
            $scope.uploadFile = function(){
               var url = document.getElementById("formUpload").action;
               if($scope.UrlParams.id){
            	   document.getElementById("formUpload").action = url+'&businessNo='+$scope.UrlParams.id;
               }else{
            	   dialog.alert("请先保存基本信息！");
               }
             
            };
            
            $scope.isUniqueName = false;
            $scope.isAuto = false;
            $scope.autoSearchInstitution = function($event){
            	var name =  $scope.institutionDetail.name;
            	var id = $scope.institutionDetail.providerid;
                if(!id && name){
                	var params = {name:name};
                	$scope.isAuto = true;
                	  institutionDetailService.queryProviderDetail(params,function(data){
                		  if(data.result){
                			  $scope.isUniqueName = true;
                              document.getElementById("name").focus(); 
                           }else{
                        	   $scope.isUniqueName = false;
                           }
            		 
            		  });
                }
            };
            
            /**
             * 初始化操作
             */
            var init = function(){
            	$scope.institutionDetail={};
                if($scope.UrlParams.id){
                    $scope.queryProviderDetail();
                    $("#upload").bind('load',function(){
                        console.log('进入加载');
                        var datas = this.contentWindow.document.body.innerHTML;
                        if(!hcpms.utils.isBlank(datas)){
                            var data = JSON.parse(datas);
                            dialog.alert(data.msg);
                            var obj = document.getElementById("uploadFile");
                            var isIE = document.attachEvent;
                       	 	if(isIE){
	                       	 	obj.select();
	                            document.selection.clear();
                       	 	}else{
                       	 		obj.value = '';
                       	 	}
                       	 	document.getElementById("spanFileName").value = '';
                            $scope.queryImgList();
                        }
                    });
                }
            };
            init();
        }
    ];
});
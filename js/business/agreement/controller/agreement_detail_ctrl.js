/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块-明细控制器
 */
define(function(require){
	return  ['$scope', 'AgreementService','InstitutionListService','$location','$routeParams',
	    function ($scope,agreementService,institutionListService,$location,$routeParams) {
            /** 变量定义--agreementDetail缓存对象*/
            $scope.oldAgreementDetail = {};
            /** url请求参数对象*/
            $scope.UrlParams = $routeParams;
            $scope.areasList = [];
            $scope.healthProviderList = [];
            /**
             * 协议详细信息--查询
             * @param params
             */
            $scope.agreementDetail = {};
            $scope.getAgreementDetail = function(){
                var params = {id:$scope.UrlParams.id};
                agreementService.show(params,function(data){
                    $scope.agreementDetail = data.result;
                    $scope.agreementDetail.oldPayMentMode = data.result.payMentMode;
                    $scope.oldAgreementDetail = angular.copy($scope.agreementDetail);
                });
            };
            $scope.institutionListParam = {
                page:"1",
                pageSize:"10"
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
                        limitList:[{
                            text:"10",
                            val:"10"
                        }],
                        curPage:params.page,
                        total:data.totals.total,
                        limit: params.pageSize,
                        loadData:$scope.queryInstitutionList
                    };
                });
            };
            $scope.selectProvider = {};
            $scope.getSelectProvider = function(item){
                $scope.selectProvider = item;
            };
            $scope.setProvider = function(){
                $scope.agreementDetail.healthcareProviderName = $scope.selectProvider.name;
                $scope.agreementDetail.idHealthcareProvider = $scope.selectProvider.providerid;
            };
            $scope.cleanSelectProvider = function(){
                $scope.selectProvider = {};
            };
            $scope.endDate = {endDate:new Date()};
            /**
             * 协议详细信息--修改
             * @param params
             */
            $scope.updateAgreementDetail = function(){
                $scope.agreementDetail.id=$scope.UrlParams.id;
                var params = $scope.agreementDetail;
                agreementService.update(params,function(data){
                	dialog.alert(data.msg);
                    $scope.getAgreementDetail($routeParams);
                });
            };
            $scope.addAgreement = function(){
                var params = $scope.agreementDetail;
                agreementService.create(params,function(data){
                    if(data.state == "0"){
                        $scope.UrlParams.id = data.result;
                    }
                    dialog.alert(data.msg);
                });
            };
            $scope.submitted = false;
            $scope.saveAgreementDetail = function(isValid){
                if(isValid){
                    if($scope.UrlParams.id){
                        $scope.updateAgreementDetail();
                    }else{
                        $scope.addAgreement();
                    }
                }else{
                    $scope.agreementDetailsubmitted = true;
                }
            };
            /**
             * 协议详细信息--取消
             */
            $scope.resetAgreementDetail = function(){
                dialog.confirm('是否取消修改的数据？',function(){
                    $scope.$apply(function(){
                        $scope.agreementDetail = angular.copy($scope.oldAgreementDetail);
                    });
                });
            };
            $scope.imgIdList ="";
            $scope.deleteImgList = function(){
                var params = {id:$scope.imgIdList};
                dialog.confirm('是否删除选中项？',function(){
                    agreementService.deleteImgList(params,function(data){
                        dialog.alert(data.msg);
                        $scope.imgIdList ="";
                        document.getElementById('imgIdList').checked = false;
                        $scope.queryImgList();
                    });
                });
            };
            $scope.queryImgList = function(){
                var params = {businessNo:$scope.agreementDetail.id};
                agreementService.queryImgList(params,function(data){
                    $scope.agreementDetail.imgList = data.result.imgList;
                    document.getElementById("uploadFile").value = "";
                })
            }
            $scope.getImgInfo = function($event,index,fileName){
                var target = $event.target;
                var params = {downloadFlag:'Y',index:index,name:fileName};
                agreementService.getImgInfo(params,function(data){
                    document.getElementById("downloadURL").src = data.result.url;
                });
            };
            $scope.setPaymentMode = function(e){
                var v = Utils.getCheckedValue(e,$scope.agreementDetail.payMentMode);
                $scope.agreementDetail.payMentMode = v;
            }
            /**
             * 列表复�1�7�框--全�1�7�控刄1�7
             * @type {{}}
             */

            $scope.getImgIdList = function(domName,isArray,prefix){
                $scope.imgIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };
            $scope.uploadFile = function(){
            	var url = document.getElementById("formUpload").action;
                if(!hcpms.utils.isBlank($scope.UrlParams.id)) {
                    document.getElementById("formUpload").action = url + '&businessNo=' + $scope.UrlParams.id;
                }else{
                	dialog.alert("请先保存基本信息");
                }
            };
            /**
             * 初始化操作
             */
            var init = function(){
                if($scope.UrlParams.id){
                    $scope.getAgreementDetail();
                    $("#upload").bind('load',function(){
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
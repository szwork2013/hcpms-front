/**
 * CreatedBy: 	River
 * CreateDate:	2014-05-12
 * Email:		ex-lijiang001
 * Version:		0.0.1
 * Description:	协议模块-支付方式
 */
define(function(require){
	return ['$scope', 'AgreementService','AgreementPayModeService','$routeParams',
	    function ($scope,agreementService,agreementPayModeService,$routeParams) {
            $scope.UrlParams = $routeParams;
            /**
             * 初始化操佄1�7
             */
            var init = function(){
            	if($scope.UrlParams.id){
            		$scope.getPayModeDetail();
            	}
            };
            // 支付方案对象（包含所霄1�7查询方案类型的结果集及列表是否显示的boolean值）
            $scope.agreementPayDetail = {};
            $scope.$on('updateList',function(event,msg){
        		if(msg){
        			init();
        		}
        	});
            /**
             * 查询支付方式类型
             */
            $scope.getPayModeDetail = function(){
                var params = $scope.UrlParams;
                agreementService.show(params,function(data){
                    $scope.agreementPayDetail.payMentMode = data.result.payMentMode;
                    dispatchQueryList($scope.agreementPayDetail.payMentMode);
                });
            };
            /**
             * 根据支付方式类型分发请求
             * @param payMode
             */
            var dispatchQueryList = function(payMode){
                var payModeArray = payMode.split(',');
                for(var i = 0;i < payModeArray.length; i++){
                    if(payModeArray[i] == "01"){
                        //按�1�7�额付费
                        $scope.queryGloPayList();
                        $scope.agreementPayDetail.gloPayShow = true;
                    }else if(payModeArray[i] == "02"){
                        //按人头付贄1�7
                        $scope.queryCapPayList();
                        $scope.agreementPayDetail.capPayShow = true;
                    }else if(payModeArray[i] == "03"){
                        //按项目付贄1�7
                        $scope.querySerPayList();
                        $scope.agreementPayDetail.serPayShow = true;
                    }else if(payModeArray[i] == "04"){
                        //按病种付贄1�7
                        $scope.queryDisPayList();
                        $scope.agreementPayDetail.disPayShow = true;
                    }
                }
            };
            /**
             * 按�1�7�额支付方式--查询列表
             */
            $scope.queryGloPayList = function(){
                var params = {agreementId:$scope.UrlParams.id};
                agreementPayModeService.queryGloList(params,function(data){
                    $scope.agreementPayDetail.gloPayList = data.result;
                });
            };
            /**
             * 按�1�7�额支付方式--查询明细
             * @param params
             */
            $scope.gloPayId = "";
            $scope.getGloGetDetail = function(e){
                $scope.gloPayId = e.target.id;
                var params = {id:$scope.gloPayId};
                agreementPayModeService.getGloGetDetail(params,function(data){
                    $scope.gloPayDetail = data.result;
                });
            };
            /**
             * 按�1�7�额支付方式--修改
             * @param params
             */
            $scope.updateGloGet = function(dialogObj){
                var params= $scope.gloPayDetail;
                agreementPayModeService.updateGloGet(params,function(data){
                    dialog.alert(data.msg,function(){
                        hcpms.log(dialogObj)
                        dialogObj.hide();
                    });
                    $scope.queryGloPayList();
                });
            };

            /**
             * 按�1�7�额支付方式--添加
             * @param params
             */
            $scope.addGloGet = function(dialogObj){
                var params = $scope.gloPayDetail;
                params.agreementId = $scope.UrlParams.id;
                agreementPayModeService.addGloGet(params,function(data){
                    dialog.alert(data.msg,function(){
                        dialogObj.hide();
                    });
                    $scope.queryGloPayList();
                });
            };

            /**
             * 按�1�7�额支付方式--删除
             * @param params
             */
            $scope.deleteGloGet = function(){
                var params = {id:$scope.agreementeGloGetIdList};
                 dialog.confirm('是否删除选中项？',function(){
                    agreementPayModeService.deleteGloGet(params,function(data){
                        dialog.alert(data.msg);
                        $scope.agreementeGloGetIdList ="";
                        document.getElementById('agreementeGloGetIdList').checked = false;
                        $scope.queryGloPayList();
                    });
                 });
            };
            /**
             * 按�1�7�额支付方法--保存或新墄1�7
             */
            $scope.gloSubmitted = false;
            $scope.saveGloPay =function(isValid,popId){
                var dialogObj = $("#"+popId).data("dialog");
                if(isValid) {
                    if ($scope.gloPayId) {
                        $scope.updateGloGet(dialogObj);
                    } else {
                        $scope.addGloGet(dialogObj);
                    }
                }else
                {
                    $scope.gloSubmitted = true;
                }
            };
            /**
             * 按�1�7�额支付方式--清空明细
             */
            $scope.cleanGloGet = function(){
                $scope.gloSubmitted = false;
                $scope.gloPayId = "";
                $scope.gloPayDetail = {};
            };
            /**
             * 按�1�7�额支付方式列表复�1�7�框--全�1�7�控刄1�7
             * @type {{}}
             */
            $scope.agreementeGloGetIdList="";
            $scope.getAgreementGloGetIdList = function(domName,isArray,prefix){
                $scope.agreementeGloGetIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };
            /**
             * 按人头支付方弄1�7--查询列表
             */
            $scope.queryCapPayList = function(){
                var params = {agreementId:$scope.UrlParams.id};
                agreementPayModeService.queryCapPayList(params,function(data){
                    $scope.agreementPayDetail.capPayList = data.result;
                });
            }
            /**
             * 按人头支付方弄1�7--查询明细
             * @param params
             */
            $scope.capPayId = "";
            $scope.getCapPayDetail = function(e){
                $scope.capPayId = e.target.id;
            	var params = {id:$scope.capPayId};
                agreementPayModeService.getCapPayDetail(params,function(data){
                    $scope.capPayDetail= data.result;
                });
            };
            /**
             * 按人头支付方弄1�7--修改
             * @param params
             */
            $scope.updateCapPay = function(dialogObj){
                var params = $scope.capPayDetail;
                agreementPayModeService.updateCapPay(params,function(data){
                    dialog.alert(data.msg,function(){
                        dialogObj.hide();
                    });
                    $scope.queryCapPayList();

                });
            };
            /**
             * 按人头支付方弄1�7--添加
             * @param params
             */
            $scope.addCapPay = function(dialogObj){
                var params = $scope.capPayDetail;
                params.agreementId = $scope.UrlParams.id;
                agreementPayModeService.addCapPay(params,function(data){
                    dialog.alert(data.msg,function(){
                        dialogObj.hide();
                     });
                    $scope.queryCapPayList();

                });
            };
            /**
             * 按人头支付方弄1�7--删除
             * @param params
             */
            $scope.deleteCapPay = function(){
                var params = {id:$scope.agreementeCapPayIdList};
                 dialog.confirm('是否删除选中项？',function(){
                    agreementPayModeService.deleteCapPay(params,function(data){
                        dialog.alert(data.msg);
                        $scope.agreementeCapPayIdList ="";
                        document.getElementById('agreementeCapPayIdList').checked = false;
                        $scope.queryCapPayList();
                    });
                 });
            };
            $scope.capPayId = "";
            /**
             * 按人头支付方泄1�7--保存或新墄1�7
             */
            $scope.gloSubmitted02 = false;
            $scope.saveCapPay = function(isValid,popId){
               var dialogObj = $("#"+popId).data("dialog");
                if(isValid) {
                    if ($scope.capPayId) {
                        $scope.updateCapPay(dialogObj);
                    } else {
                        $scope.addCapPay(dialogObj);
                    }
                }else
                {
                    $scope.gloSubmitted02 = true;
                }
            };
            /**
             * 按人头支付方弄1�7--清空明细
             */
            $scope.cleanCapPay = function(){
                $scope.gloSubmitted02 = false;
                $scope.capPayId = "";
                $scope.capPayDetail = {};
            };
            /**
             * 按人头支付方式列表复选框--全�1�7�控刄1�7
             * @type {{}}
             */
            $scope.agreementeCapPayIdList = "";
            $scope.getAgreementeCapPayIdList = function(domName,isArray,prefix){
                $scope.agreementeCapPayIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };
            /**
             * 按项目支付方弄1�7--查询列表
             */
            $scope.querySerPayList = function(){
                var pageInfo = $scope.serPgPageInfo;
                var params = {agreementId:$scope.UrlParams.id,page:"1",pageSize:"10"};
                params.page = pageInfo&&pageInfo.curPage ||  params.page;
                params.pageSize = pageInfo&&pageInfo.limit || params.pageSize;
                agreementPayModeService.querySerPayList(params,function(data){
                    $scope.agreementPayDetail.serPayList = data.result;
                    //配置分页参数
                    $scope.serPgPageInfo = {
                        curPage:params.page,
                        total:data.totals.total,
                        limit: params.pageSize,
                        loadData:$scope.querySerPayList
                    };
                });
            };
            /**
             * 按项目支付方弄1�7--查询明细
             * @param params
             */
            $scope.getSerPayDetail = function(e){
                $scope.serPayId = e.target.id;
                var params = {id:$scope.serPayId};
                agreementPayModeService.getSerPayDetail(params,function(data){
                    $scope.serPayDetail = data.result;
                });
            };
            /**
             * 按项目支付方弄1�7--修改
             * @param params
             */
            $scope.updateSerPay = function(dialogObj){
                var params = $scope.serPayDetail;
                agreementPayModeService.updateSerPay(params,function(data){
                    dialog.alert(data.msg,function(){
                        dialogObj.hide();
                    });
                    $scope.querySerPayList();
                });
            };
            /**
             * 按项目支付方弄1�7--添加
             * @param params
             */
            $scope.addSerPay = function(dialogObj){
                var params = $scope.serPayDetail;
                params.agreementId = $scope.UrlParams.id;
                agreementPayModeService.addSerPay(params,function(data){
                    dialog.alert(data.msg,function(){
                        dialogObj.hide();
                    });
                    $scope.querySerPayList();
                });
            };
            /**
             * 按项目支付方弄1�7--删除
             * @param params
             */
            $scope.deleteSerPay = function(){
                var params={'id':$scope.agreementeSerPayIdList};
                 dialog.confirm('是否删除选中项？',function(){
                    agreementPayModeService.deleteSerPay(params,function(data){
                        dialog.alert(data.msg);
                        $scope.agreementeSerPayIdList ="";
                        document.getElementById('agreementeSerPayIdList').checked = false;
                        $scope.querySerPayList();
                    });
                 });
            };
            /**
             * 按项目支付方泄1�7--保存或新墄1�7
             */
            $scope.gloSubmitted03 = false;
            $scope.serPayId = "";
            $scope.saveSerPay =  function(isValid,popId){
                var dialogObj = $("#"+popId).data("dialog");
                if(isValid) {
                    if ($scope.serPayId) {
                        $scope.updateSerPay(dialogObj);
                    } else {
                        $scope.addSerPay(dialogObj);
                    }
                }else
                {
                    $scope.gloSubmitted03 = true;
                }
            };
            /**
             * 按项目支付方弄1�7--清空明细
             */
            $scope.cleanSerPay = function(){
                $scope.gloSubmitted03 = false;
                $scope.serPayId = "";
                $scope.serPayDetail = {};
            };
            /**
             * 按项目支付方式列表复选框--全�1�7�控刄1�7
             * @type {{}}
             */
            $scope.agreementeSerPayIdList = "";
            $scope.getAgreementeSerPayIdList = function(domName,isArray,prefix){
                $scope.agreementeSerPayIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };
            /**
             * 按病种支付方弄1�7--查询列表
             * @param params
             */
            $scope.queryDisPayList = function(){
                var pageInfo = $scope.disPgPageInfo;
                var params = {agreementId:$scope.UrlParams.id,page:"1",pageSize:"10"};
                params.page = pageInfo&&pageInfo.curPage ||  params.page;
                params.pageSize = pageInfo&&pageInfo.limit || params.pageSize;
                agreementPayModeService.queryDisPayList(params,function(data){
                    $scope.agreementPayDetail.disPayList = data.result;
                    //配置分页参数
                    $scope.disPgPageInfo = {
                        curPage:params.page,
                        total:data.totals.total,
                        limit: params.pageSize,
                        loadData:$scope.queryDisPayList
                    };
                });
            };
            /**
             * 按病种支付方弄1�7--查询明细
             * @param params
             */
            $scope.getDisPayDetail = function(e){
                $scope.disPayId = e.target.id;
                var params = {id:$scope.disPayId};
                agreementPayModeService.getDisPayDetail(params,function(data){
                    $scope.disPayDetail = data.result;
                });
            };
            /**
             * 按病种支付方弄1�7--修改
             * @param params
             */
            $scope.updateDisPay = function(dialogObj){
                var params = $scope.disPayDetail;
                params.agreementId = $scope.UrlParams.id;
                agreementPayModeService.updateDisPay(params,function(data){
                    dialog.alert(data.msg,function(){
                        dialogObj.hide();
                    });
                    $scope.queryDisPayList();
                });
            };
            /**
             * 按病种支付方弄1�7--添加
             * @param params
             */
            $scope.addDisPay = function(dialogObj){
                var params = $scope.disPayDetail;
                params.agreementId = $scope.UrlParams.id;
                agreementPayModeService.addDisPay(params,function(data){
                    dialog.alert(data.msg,function(){
                        dialogObj.hide();
                    });
                    $scope.queryDisPayList();
                });
            };
            /**
             * 按病种支付方弄1�7--删除
             * @param params
             */
            $scope.deleteDisPay = function(){
                var params = {'id':$scope.agreementeDisPayIdList};
                dialog.confirm('是否删除选中项？',function(){
                    agreementPayModeService.deleteDisPay(params,function(data){
                        dialog.alert(data.msg);
                        $scope.agreementeDisPayIdList ="";
                        document.getElementById('agreementeDisPayIdList').checked = false;
                        $scope.queryDisPayList();
                    });
                });
            };

            $scope.disPayId = "";
            /**
             * 按病种支付方泄1�7--保存或新墄1�7
             */
            $scope.gloSubmitted04 = false;
            $scope.saveDisPay = function(isValid,popId){
                var dialogObj = $("#"+popId).data("dialog");
                if(isValid) {
                    if($scope.disPayId){
                        $scope.updateDisPay(dialogObj);
                    }else{
                        $scope.addDisPay(dialogObj);
                    }
                }else
                {
                    $scope.gloSubmitted04 = true;

                }
            };
            /**
             * 按病种支付方弄1�7--清空明细
             */
            $scope.cleanDisPay = function(){
                $scope.gloSubmitted04 = "";
                $scope.disPayId = "";
                $scope.disPayDetail = {};
            };
            /**
             * 按病种支付方式列表复选框--全�1�7�控刄1�7
             * @type {{}}
             */
            $scope.agreementeDisPayIdList = "";
            $scope.getAgreementeDisPayIdList = function(domName,isArray,prefix){
                $scope.agreementeDisPayIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };
            $scope.autoSearch = function($event){
                var code =  $event.target.name;
                var codeNo = "";
                var codeName = "";
                if('serviceItemCode' == code){
                    codeNo = $scope.serPayDetail.serviceItemCode;
                }else if('serviceItemName' == code){
                    codeName = $scope.serPayDetail.serviceItemName;
                }
                var params = {codeType:"diagnosistreat",codeNo:codeNo,codeName:codeName};
                if(!hcpms.utils.isBlank(codeNo) || !hcpms.utils.isBlank(codeName)){
                    agreementPayModeService.search(params,function(data){
                        if(data.result.length > 0){
                            $scope.serPayDetail.serviceItemCode = data.result[0].codeNo;
                            $scope.serPayDetail.serviceItemName = data.result[0].codeName;
                            $scope.serPayDetail.serviceItemDetail = data.result[0].connotation;
                       }
                    });
                }
            };

            $scope.autoSearch02 = function($event){
                var code =  $event.target.name;
                var codeNo = "";
                var codeName = "";
                if('diseaseCode' == code){
                    codeNo = $scope.disPayDetail.diseaseCode;
                }else if('diseaseName' == code){
                    codeName = $scope.disPayDetail.diseaseName;
                }
                var params = {codeType:"disease",codeNo:codeNo,codeName:codeName};
                if(!hcpms.utils.isBlank(codeNo) || !hcpms.utils.isBlank(codeName)){
                    agreementPayModeService.search(params,function(data){
                        if(data.result.length > 0){
                            $scope.disPayDetail.diseaseCode = data.result[0].codeNo;
                            $scope.disPayDetail.diseaseName = data.result[0].codeName;
                        }
                    });
                }
            };
            init();
        }
    ];
});
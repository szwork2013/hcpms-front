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
    return  ['$scope', 'EquipmentDetailService','$location','$routeParams',
        function ($scope,equipmentDetailService,$location,$routeParams) {
            /** 变量定义--medicalDetail缓存对象*/
            //$scope.oldmedicalDetail = {};
            /** url请求参数对象*/
            $scope.UrlParams = $routeParams;
            $scope.updateEquipmentDetail = function(dialogObj){
                var params = $scope.equipmentDetail;
                params.id = $scope.equipmentId;
                equipmentDetailService.updateEquipmentDetail(params,function(data){
                    dialog.alert(data.msg,function(){
                        dialogObj.hide();
                    });
                    $scope.queryEquipmentList();
                });
            };
            $scope.queryEquipmentListParams = {
                page:"1",
                pageSize:"20",
                providerid:$scope.UrlParams.id
            };
            $scope.queryEquipmentList = function(){
                var pageInfo = $scope.pageInfo;
                var params = $scope.queryEquipmentListParams;
                params.page = pageInfo&&pageInfo.curPage ||  params.page;
                params.pageSize = pageInfo&&pageInfo.limit || params.pageSize;
                equipmentDetailService.queryEquipmentList(params,function(data){
                    $scope.equipmentList = data.result;
                    //配置分页参数
                    $scope.pageInfo = {
                        curPage:params.page,
                        total:data.totals.total,
                        limit: params.pageSize,
                        isShow : true,
                        loadData:$scope.queryEquipmentList
                    };
                });
            };
            /**
             * 列表复选框--全选控制
             * @type {{}}
             */
            $scope.equipmentIdList = "";
            $scope.getEquipmentIdList = function(domName,isArray,prefix){
                $scope.equipmentIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };
            $scope.deleteEquipmentList = function(params){
            	dialog.confirm("您确认删除？",function(){
                    var params = {id:$scope.equipmentIdList};
                    equipmentDetailService.deleteEquipmentList(params,function(data){
                    	dialog.alert(data.msg);
                   	   $scope.equipmentIdList ="";
                       document.getElementById('equipmentIdList').checked = false;
                        $scope.queryEquipmentList();
                    });
            	})
          
            };
            $scope.addEquipment = function(dialogObj){
                var params = $scope.equipmentDetail;
                params.providerid = $scope.UrlParams.id;
                equipmentDetailService.addEquipment(params,function(data){
                    dialog.alert(data.msg,function(){
                        dialogObj.hide();
                    });
                    $scope.queryEquipmentList();
                });
            };
            /**
             * 医疗设备--查询明细
             * @param params
             */
            $scope.equipmentId = "";
            $scope.getEquipmentDetail = function(e){
                $scope.equipmentId = e.target.id;
                var params = {id:$scope.equipmentId};
                equipmentDetailService.getEquipmentDetail(params,function(data){
                    $scope.equipmentDetail = data.result;
                });
            };
            /**
             * 医疗设备--保存或新增
             */
            $scope.equipmentSubmitted = false;
            $scope.saveEquipment = function(isValid,popId){
            	var dialogObj = $("#"+popId).data("dialog");
                if(isValid) {
                	   if( $scope.equipmentId){
                           $scope.updateEquipmentDetail(dialogObj);
                       }else{
                           $scope.addEquipment(dialogObj);
                       }
                }else
                {
                    $scope.equipmentSubmitted = true;
                }
             
            };
            /**
             * 医疗设备--清空明细
             */
            $scope.clean = function(){
            	 $scope.equipmentSubmitted = false;
                $scope.equipmentId = "";
                $scope.equipmentDetail = {};
            };
      
        }
    ];
});
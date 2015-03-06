/**
 * Created by EX-lijiang001 on 2014/5/15.
 * Email ex-lijiang001
 * Description 巡查任务
 */
define(function() {
    return ['$scope', 'TourService', function ($scope,TourService) {
        /**
         * @description 查询参数
         * @type {Object}
         * 如果是分页固定参数
         * page:
         * pageSize:
         */
        $scope.queryParams = {
            page:1,
            pageSize:20
        };
        /**
         * 巡查任务列表--查询
         * @param params
         */
        $scope.queryTourTaskList = function(item){
            var pageInfo = $scope.pageInfo;
            var params = $scope.queryParams;
            params.page = pageInfo&&pageInfo.curPage || "1";
            params.pageSize = pageInfo&&pageInfo.limit || "20";
            params.item = item;

            TourService.query(params,function(data){
                $scope.tourPlanList = data.result;
                //配置分页参数
                $scope.pageInfo = {
                    curPage:params.page,
                    total:data.totals.total,
                    limit: params.pageSize,
                    isShow : true,
                    loadData:$scope.queryTourTaskList
                };
            });
        };
        /**
         * 巡查任务列表--获得 巡查任务的数据
         * @param id
         */
        $scope.queryTourTaskInfo = function(id){
            TourService.queryFinishedlist({tourPlanId:id},function(data){
                $scope.tourTaskList = data.result;
            });
        };
        /**
         * 巡查任务列表--录入-初始化
         * @param params
         */
        $scope.createTourTaskInfoInit = function(id){
        	$scope.tourDetailSubmitted = false;
            TourService.createTourTaskInfoInit({tourPlanId:id},function(data){
            	$scope.tourPlanId = id;
            	$scope.tourDetail.operator= data.tourDetail.operator;
            	$scope.tourDetail.tourDate= data.tourDetail.tourDate;
            	$scope.tourDetail.tourDetailId = data.tourDetailIds[0].tourDetailId;
            	$scope.tourDetailIds = data.tourDetailIds;
                $scope.tourInspectItems = data.tourInspectItems;
            });
        };
        /**
         * 巡查任务列表--录入
         * @param params
         */
        $scope.createTourTaskInfo = function(params, dialogObj){
            TourService.add(params,function(data){
            	 dialog.alert(data.msg,function(){
         	    	dialogObj.hide();
                 });
                $scope.queryTourTaskList();
            });
        };
        /**
         *  巡查任务列表--校验后录入
         */
        $scope.tourDetailSubmitted = false;
        $scope.saveTourDetail = function(params, isValid, popId){
        	var dialogObj = $("#"+popId).data("dialog");
            if(isValid && !$scope.isUnique && !$scope.isMax && !$scope.isInteger) {
            	params.tourPlanId = $scope.tourPlanId;
                $scope.createTourTaskInfo(params, dialogObj);
            }else{
                $scope.tourDetailSubmitted = true;
            }
        };
        /**
         * 巡查任务--新增巡查任务
         * 每次新增重新初始化巡查任务列表
         */
        $scope.insertTask = function(id){
        	$scope.createTourTaskInfoInit(id);
            $scope.tourDetail = {
                tourContents:[{}]
            }
        }
        /**
         * 巡查任务--新增巡查内容
         */
        $scope.insertTourContent = function(){
            $scope.tourDetail.tourContents.push({});
        };
        /**
         * 巡查任务--删除巡查内容
         * @param inx
         */
        $scope.removeTourContent = function(inx){
            $scope.tourDetail.tourContents.splice(inx,1);
        }
        
        $scope.print = function(){

        };
        /**
         * 巡查任务--生成巡查清单
         * @param params
         */
        $scope.generate = function(id){
            TourService.generate({tourPlanId:id},function(data){
            	dialog.alert(data.msg);
            });
        };
        /**
         * 巡查任务--打印巡查清单
         * @param params
         */
        $scope.exportDetailPreview = function(id){
            TourService.exportDetail({tourPlanId:id}, function(data){
            	$scope.tourPlanId = id;
            	$scope.result = data.result;
            });
        };
        
        $scope.tourDetailId = null;
        $scope.tourDetailList = {};
        $scope.showReulstList = function(id){
            $scope.tourDetailId = id;
            var params = {tourDetailId:id};
            TourService.showReulstList(params,function(data){
                $scope.tourDetailList = data.result;
            });
        };
        $scope.cleanDetailId = function(){
            $scope.tourDetailId = null;
        };
        
        $scope.isUnique = true;
        $scope.isUniqueItemCode = function(obj,itemCode,index){
            if(!hcpms.utils.isEmpty(obj)){
                var list = angular.copy($scope.tourDetail.tourContents);
                list.splice(index,1);
                for(var i=0;i<list.length;i++){
                    if(list[i].inspectItemCode == itemCode){
                        $scope.isUnique = true;
                        return true;
                    }
                }
            }
            $scope.isUnique = false;
            return false;
        };
        
        $scope.isMax = false;
        $scope.isMaxLength = function(obj){
            if(!hcpms.utils.isBlank(obj) && obj.length > 600){
                $scope.isMax = true;
                return true;
            }else{
                $scope.isMax = false;
                return false;
            }
        };
        
        $scope.isInteger = false;
        $scope.isIntegerValidateSuccess = function(obj){
        	var reg1 =  /^\d+$/; //非负的整数正则表达式
            if(!hcpms.utils.isBlank(obj) && (!reg1.test(obj) || obj > 999)){
                $scope.isInteger = true;
                return true;
            }else{
                $scope.isInteger = false;
                return false;
            }
        };
        
        $scope.limitDate = {endDate:new Date()};
        
        $scope.queryTourTaskList("allUnfinishedItem");
    }];
});
/**
 * Created by EX-lijiang001 on 2014/5/15.
 * Email ex-lijiang001
 * Description 巡查计划
 */
define(function() {
    return ['$scope', 'TourService',
            function ($scope,TourService) {
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
         * 巡查计划列表--查询
         * @param params
         */
        $scope.queryTourPlanList = function(item){
            var pageInfo = $scope.pageInfo;
            var params = $scope.queryParams;
            params.page = pageInfo&&pageInfo.curPage || "1";
            params.pageSize = pageInfo&&pageInfo.limit || "20";
            params.item = item;
            
            TourService.query(params,function(data)
    		{
                $scope.tourPlanList = data.result;
                //配置分页参数
                $scope.pageInfo = {
                    curPage:params.page,
                    total:data.totals.total,
                    limit: params.pageSize,
                    isShow : true,
                    loadData:$scope.queryTourPlanList
                };
               
            });
        };
        /**
         * 巡查计划列表--删除
         * @param params
         */
        $scope.deleteTourPlanList = function(params){
        	var params = {id:$scope.tourPlanIdList};
    		dialog.confirm('是否删除选中项？',function(){
       		 TourService.remove(params,function(data){
                    dialog.alert(data.msg);
                    $scope.queryTourPlanList();
                    $scope.tourPlanIdList = "";
                    $scope.clearCheckAll();
                    //$scope.getTourPlanIdList();
                });
            });
            
        };
        /**
         * 巡查计划列表--新增--获取医疗机构信息
         * @param params
         */
        $scope.addTourPlanInit = function(params){
        	$scope.cleanTourPlan();
        	$scope.tourPlanSubmitted = false;
            TourService.createinit(params,function(data){
            	$scope.healthProviderList = data.result;
            	$scope.operatorList = data.operatorList;
            	$scope.newTourPlan.constitutor = data.constitutor;
            });
        };
        /**
         * 巡查计划列表--新增巡查计划
         * @param params
         */
        $scope.addTourPlanList = function(params, dialogObj){
            TourService.create(params, function(data)
    		{
        	    dialog.alert(data.msg, function()
	    		{
        	    	dialogObj.hide();
                });
            	$scope.queryTourPlanList();
            });
        };
        
        /**
         *  巡查计划列表--校验后新增
         */
        $scope.tourPlanSubmitted = false;
        $scope.saveTourPlan = function(params, isValid, popId){
        	var dialogObj = $("#"+popId).data("dialog");
            if(isValid && $scope.isValidDate) {
                $scope.addTourPlanList(params, dialogObj);
            }else{
                $scope.tourPlanSubmitted = true;
            }
        };
        $scope.isValidDate = true;
        $scope.validDate = function(obj1,obj2){
            if(!hcpms.utils.isBlank(obj1) && !hcpms.utils.isBlank(obj2)){
                var startTime = hcpms.utils.strtoDate(angular.copy(obj1));
                var endTime = hcpms.utils.strtoDate(angular.copy(obj2));
                if(startTime > endTime){
                    $scope.isValidDate = false;
                    return false;
                }else {
                    $scope.isValidDate = true;
                    return true;
                }
            }
        };
        /**
         *  巡查计划列表--校验后修改
         */
        $scope.tourPlanUpdateSubmitted = false;
        $scope.updateTourPlanFun = function(params, isValid, popId){
        	var dialogObj = $("#"+popId).data("dialog");
            if(isValid) {
                $scope.updateTourPlanList(params, dialogObj);
            }
            else
            {
                $scope.tourPlanUpdateSubmitted = true;
            }
        };
        
        /**
         * 巡查计划列表--查看详细信息
         * @param id
         */
        $scope.updateTourPlanInfo = function(id, finishedTimes){
            TourService.show({tourPlanId:id},function(data){
                $scope.updateTourPlan = data.result;
                $scope.finishedTimes = finishedTimes;
                $scope.operatorList = data.operatorList;
            });
            TourService.queryFinishedlist({tourPlanId:id},function(data){
                $scope.tourTaskList = data.result;
            });
        };
        /**
         * 巡查计划列表--更新巡查计划
         * @param params
         */
        $scope.updateTourPlanList = function(params, dialogObj){
            TourService.update(params,function(data){
            	 dialog.alert(data.msg,function(){
         	    	dialogObj.hide();
                 });
                $scope.queryTourPlanList();
            });
        };
        /**
         * 巡查计划列表--查询详细巡查任务
         * @param taskId
         */
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
            $scope.tourDetailList = null;
            $scope.tourDetailId = null;
        };
        /**
         * 巡查计划列表--隐藏详细巡查任务
         * @param taskId
         */
        $scope.hideTaskDetail = function(){
            //document.getElementById('viewTaskDetail').style.display="none";
        };
        
        /**
         * 清空巡查计划
         * @param taskId
         */
        $scope.cleanTourPlan = function(){
        	$scope.newTourPlan = {};
        };
        
        $scope.queryTourPlanList("allUnfinishedItem");
       
        $scope.tourPlanIdList = "";
        /**
         * 列表复选框--全选控制
         * @type {{}}
         */
        $scope.getTourPlanIdList = function(domName,isArray,prefix){
            $scope.tourPlanIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
        };
        
        $scope.clearCheckAll = function()
        {
        	var el = document.getElementsByTagName('input');
			var len = el.length;
			for(var i = 0; i < len; i++)
			{
				if((el[i].type == "checkbox"))
				{
					el[i].checked = false;
				}
			}
        }
				        
        /*function checkAll(name) {
					var el = document.getElementsByTagName('input');
					var len = el.length;
					for ( var i = 0; i < len; i++) {
						if ((el[i].type == "checkbox") && (el[i].name == name)) {
							el[i].checked = true;
						}
					}
				}
				function clearAll(name) {
					var el = document.getElementsByTagName('input');
					var len = el.length;
					for ( var i = 0; i < len; i++) {
						if ((el[i].type == "checkbox") && (el[i].name == name)) {
							el[i].checked = false;
						}
					}
				}*/
        
    }];
});
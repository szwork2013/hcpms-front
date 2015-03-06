/**
 * CreatedBy: 	River Lee
 * CreateDate:	2014-05-15
 * Email:		ex-lijiang001@pingan.com.cn
 * Description:	巡查模块
 */
define(function(){
	return ['$http','BaseService',function ($http,baseService) {
		var moduleRoot = "hcs/tourmanagement/";
        /**
         * 巡查列表--查询巡查计划信息
         * @param jsonObj
         * @param callback
         */
		this.query = function(jsonObj,callback){
			baseService.query(moduleRoot+"tourplan/page",jsonObj,callback);
		};
		/**
         * 巡查列表--新增巡查计划信--获取医疗机构信息
         * @param jsonObj
         * @param callback
         */
		this.createinit = function(jsonObj,callback){
			baseService.query(moduleRoot+"tourplan/createinit",jsonObj,callback);
		};
        /**
         * 巡查列表--新增巡查计划信息
         * @param jsonObj
         * @param callback
         */
        this.create = function(jsonObj,callback){
            baseService.add(moduleRoot+"tourplan/create",jsonObj,callback);
        };
        /**
         * 巡查列表--修改巡查计划信息
         * @param id
         * @param callback
         */
        this.update = function(jsonObj,callback){
            baseService.update(moduleRoot+"tourplan/update",jsonObj,callback);
        };
        /**
         * 巡查列表--删除巡查计划信息
         * @param jsonObj {id:'0333,0111'}
         * @param callback
         */
        this.remove = function(jsonObj,callback){
            baseService.remove(moduleRoot+"tourplan/delete",jsonObj,callback);
        };
        /**
         * 巡查列表--查询巡查计划详细信息
         * @param jsonObj
         * @param callback
         */
        this.show = function(jsonObj,callback){
            baseService.get(moduleRoot+"tourplan/show",jsonObj,callback);
        };

        /**
         * 巡查列表--查询已完成巡查任务列表
         * @param jsonObj
         * @param callback
         */
		this.queryFinishedlist = function(jsonObj,callback){
			baseService.get(moduleRoot+"tourdetail/finishedlist",jsonObj,callback);
		};
        /**
         * 巡查任务
         * @param jsonObj
         * @param callback
         */
        this.queryTourResults  = function(jsonObj,callback){
            baseService.query(moduleRoot+"queryTourResults",jsonObj,callback);
        };
        /**
         *
         * @param jsonObj
         * @param callback
         */
        this.queryTourPatients  = function(jsonObj,callback){
            baseService.query(moduleRoot+"queryTourPatients",jsonObj,callback);
        };
        /**
         * 巡查列表--录入巡查结果信息--初始化
         * @param jsonObj
         * @param callback
         */
		this.createTourTaskInfoInit = function(jsonObj,callback){
			baseService.get(moduleRoot+"tourdetail/addinit",jsonObj,callback);
		};
        /**
         * 巡查列表--录入巡查结果信息
         * @param jsonObj
         * @param callback
         */
        this.add = function(jsonObj,callback){
            baseService.add(moduleRoot+"tourdetail/add",jsonObj,callback);
        };
        /**
         * 巡查列表--巡查任务生成
         * @param jsonObj
         * @param callback
         */
		this.generate = function(jsonObj,callback){
			baseService.get(moduleRoot+"tourdetail/generate",jsonObj,callback);
		};
		/**
         * 巡查列表--打印巡查清单
         * @param jsonObj
         * @param callback
         */
		this.exportDetail = function(jsonObj,callback){
			baseService.get(moduleRoot+"tourdetail/export",jsonObj,callback);
		};
        /**
         * 巡查任务--已完成巡查任务明细
         * @param jsonObj
         * @param callback
         */
        this.showReulstList = function(jsonObj,callback){
            baseService.get(moduleRoot+"tourresult/list",jsonObj,callback);
        };
	}];
});
/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-21
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	统计报表模块--RESTful服务
 */
define(function(){
	return ['$http','BaseService',function ($http,baseService) {
		var moduleRoot = "report";
        /**
         * 统计报表--查询
         * @param jsonObj
         * @param callback
         */
		this.queryPondList = function(jsonObj,callback){
			baseService.query(moduleRoot+"/pond/page",jsonObj,callback);
		};
        /**
         * 统计报表--新增费用控制指标
         * @param jsonObj
         * @param callback
         */
        this.createFee = function(jsonObj,callback){
            baseService.add(moduleRoot+"/fee/create",jsonObj,callback);
        };
        /**
         * 统计报表--新增单病种控制指标
         * @param jsonObj
         * @param callback
         */
        this.createDisease = function(jsonObj,callback){
            baseService.add(moduleRoot+"/disease/create",jsonObj,callback);
        };
        /**
         * 协议明细--新增质量控制指标
         * @param id
         * @param callback
         */
        this.createQuality = function(jsonObj,callback){
            baseService.add(moduleRoot+"/quality/create",jsonObj,callback);
        };
	}];
});
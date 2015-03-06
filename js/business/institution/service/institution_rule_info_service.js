/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-16
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	账号模块--RESTful服务
 */
define(function(){
	return ['$http','BaseService',function ($http,baseService) {
		var moduleRoot = "hcp/hcp/breach";
        /**
         * 违规信息--查询列表信息
         * @param jsonObj
         * @param callback
         */
		this.queryRuleInfoList = function(jsonObj,callback){
			baseService.query(moduleRoot+"/page",jsonObj,callback);
		};
        /**
         * 违规信息--新增
         * @param jsonObj
         * @param callback
         */
        this.addRuleInfo = function(jsonObj,callback){
            baseService.add(moduleRoot+"/create",jsonObj,callback);
        };
        /**
         * 违规信息--查询明细
         * @param jsonObj
         * @param callback
         */
        this.getRuleInfoDetail = function(jsonObj,callback){
            baseService.get(moduleRoot+"/show",jsonObj,callback);
        };
        /**
         * 违规信息--修改
         * @param jsonObj
         * @param callback
         */
        this.updateRuleInfo = function(jsonObj,callback){
            baseService.update(moduleRoot+"/update",jsonObj,callback);
        };
        /**
         * 违规信息--删除
         * @param jsonObj
         * @param callback
         */
        this.deleteRuleInfo = function(jsonObj,callback){
            baseService.remove(moduleRoot+"/delete",jsonObj,callback);
        };
	}];
});
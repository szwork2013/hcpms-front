/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-16
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	账号模块--RESTful服务
 */
define(function(){
	return ['$http','BaseService',function ($http,baseService) {
		var moduleRoot = "hcp/hcp/contact";
        /**
         * 联系信息--查询列表信息
         * @param jsonObj
         * @param callback
         */
		this.queryRelationList = function(jsonObj,callback){
			baseService.query(moduleRoot+"/page",jsonObj,callback);
		};
        /**
         * 联系信息--新增
         * @param jsonObj
         * @param callback
         */
        this.addRelation = function(jsonObj,callback){
            baseService.update(moduleRoot+"/create",jsonObj,callback);
        };
        /**
         * 联系信息--修改
         * @param jsonObj
         * @param callback
         */
        this.updateRelation = function(jsonObj,callback){
            baseService.update(moduleRoot+"/update",jsonObj,callback);
        };
        /**
         * 联系信息--明细
         * @param jsonObj
         * @param callback
         */
        this.getRelationDetail = function(jsonObj,callback){
            baseService.get(moduleRoot+"/show",jsonObj,callback);
        };
        /**
         * 联系信息--删除
         * @param jsonObj
         * @param callback
         */
        this.deleteRelation = function(jsonObj,callback){
            baseService.remove(moduleRoot+"/delete",jsonObj,callback);
        };
	}];
});
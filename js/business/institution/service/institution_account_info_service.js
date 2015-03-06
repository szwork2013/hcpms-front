/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-16
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	账号模块--RESTful服务
 */
define(function(){
	return ['$http','BaseService',function ($http,baseService) {
		var moduleRoot = "hcp/hcp/account";
        /**
         * 帐户信息--查询列表信息
         * @param jsonObj
         * @param callback
         */
		this.queryAccountInfoList = function(jsonObj,callback){
			baseService.query(moduleRoot+"/page",jsonObj,callback);
		};
        /**
         * 帐户信息--明细
         * @param jsonObj
         * @param callback
         */
        this.getAccountInfoDetail = function(jsonObj,callback){
            baseService.get(moduleRoot+"/show",jsonObj,callback);
        };
        /**
         * 帐户信息--新增
         * @param jsonObj
         * @param callback
         */
        this.addAccountInfo = function(jsonObj,callback){
            baseService.update(moduleRoot+"/create",jsonObj,callback);
        };
        /**
         * 帐户信息--修改
         * @param jsonObj
         * @param callback
         */
        this.updateAccountInfo = function(jsonObj,callback){
            baseService.update(moduleRoot+"/update",jsonObj,callback);
        };
        /**
         * 帐户信息--删除
         * @param jsonObj
         * @param callback
         */
        this.deleteAccountInfo = function(jsonObj,callback){
            baseService.remove(moduleRoot+"/delete",jsonObj,callback);
        };
	}];
});
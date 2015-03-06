/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块--RESTful服务
 */
define(function(){
	return ['$http','BaseService',function ($http,baseService) {
		var moduleRoot = "performance";
        /**
         * 协议列表--查询协议列表信息
         * @param jsonObj
         * @param callback
         */
		this.query = function(jsonObj,callback){
			baseService.query(moduleRoot+"/generation/page",jsonObj,callback);
		};
        /**
         * 协议列表--生成
         * @param jsonObj
         * @param callback
         */
        this.create = function(jsonObj,callback){
            baseService.add(moduleRoot+"/generation/create",jsonObj,callback);
        };
	}];
});
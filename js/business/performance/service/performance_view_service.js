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
         * 报表查看--查询列表信息
         * @param jsonObj
         * @param callback
         */
		this.query = function(jsonObj,callback){
			baseService.query(moduleRoot+"/view/page",jsonObj,callback);
		};
	}];
});
/**
 * Created by wanghua on 2014/5/27.
 * Description 监控路由
 */
define(function(){
	return ['$http','BaseService',function ($http,baseService) {
		var moduleRoot = "monitor";
		/**
         * 巡查列表--查询巡查计划详细信息
         * @param jsonObj
         * @param callback
         */
        this.list = function(callback){
            baseService.get(moduleRoot+"/list", null, callback);
        };
	}];
});
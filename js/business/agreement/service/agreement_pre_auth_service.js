/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块--RESTful服务
 */
define(function(){
	return ['$http','BaseService',function ($http,baseService) {
        var moduleRoot = "hcp";
        // 预授权方案接口
        this.getPreAuthDetail = function(params,callback){
            baseService.get(moduleRoot+"/agreement/preauthorization/show",params,callback);
        };
        this.queryPreAuthList = function(params,callback){
            baseService.query(moduleRoot+"/agreement/preauthorization/page",params,callback);
        };
        this.updatePreAuth = function(params,callback){
            baseService.update(moduleRoot+"/agreement/preauthorization/update",params,callback);
        };
        this.addPreAuth = function(params,callback){
            baseService.add(moduleRoot+"/agreement/preauthorization/create",params,callback);
        };
        this.deletePreAuth = function(params,callback){
            baseService.remove(moduleRoot+"/agreement/preauthorization/delete",params,callback);
        };
        // 联动查询
        this.search = function(params,callback){
            baseService.post('common/code',params,callback);
        };
	}];
});
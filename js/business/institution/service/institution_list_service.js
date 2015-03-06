/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	账号模块--RESTful服务
 */
define(function(){
	return ['$http','BaseService',function ($http,baseService) {
		var moduleRoot = "hcp/hcp/base";
        /**
         * 机构列表--查询机构列表信息
         * @param jsonObj
         * @param callback
         */
		this.query = function(jsonObj,callback){
			baseService.query(moduleRoot+"/page",jsonObj,callback);
		};
        /**
         * 机构详情--新增机构详情
         * @param jsonObj
         * @param callback
         */
        this.createProvider = function(jsonObj,callback){
            baseService.add(moduleRoot+"/create",jsonObj,callback);
        };

        /**
         * 机构列表--删除机构信息
         * @param jsonObj {id:'0333,0111'}
         * @param callback
         */
        this.deleteInstitutionList = function(jsonObj,callback){
            baseService.remove(moduleRoot+"/delete",jsonObj,callback);
        };
	}];
});
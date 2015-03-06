/**
 * CreatedBy: 	wh
 * CreateDate:	2014-05-16
 * Email:		ex-wanghua001@pingan.com.cn
 * Version:		0.0.1
 * Description:	医疗项目--RESTful服务
 */
define(function(){
	return ['$http','BaseService',function ($http,baseService) {
		var moduleRoot = "hcp/hcp/diagnosis";
        /**
         * 医疗项目列表--查询医疗项目信息
         * @param jsonObj
         * @param callback
         */
		this.query = function(jsonObj,callback){
			baseService.query(moduleRoot+"/page",jsonObj,callback);
		};

        /**
         * 医疗项目列表--新增医疗项目
         * @param jsonObj
         * @param callback
         */
        this.create = function(jsonObj,callback){
            baseService.add(moduleRoot+"/create",jsonObj,callback);
        };

        /**
         * 医疗项目明细--查询医疗项目明细信息
         * @param id
         * @param callback
         */
        this.show = function(jsonObj,callback){
        	baseService.get(moduleRoot+"/show",jsonObj,callback);
        };

        /**
         * 医疗项目明细--修改医疗项目明细信息
         * @param id
         * @param callback
         */
        this.update = function(jsonObj,callback){
            baseService.update(moduleRoot+"/update",jsonObj,callback);
        };

        /**
         * 医疗项目列表--删除医疗项目
         * @param jsonObj {id:'0333,0111'}
         * @param callback
         */
        this.remove = function(jsonObj,callback){
            baseService.remove(moduleRoot+"/delete",jsonObj,callback);
        };
        
        // 联动查询
        this.search = function(params,callback){
            baseService.post('common/code',params,callback);
        };
	}];
});
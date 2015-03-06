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
        /**
         * 协议列表--查询协议列表信息
         * @param jsonObj
         * @param callback
         */
		this.query = function(jsonObj,callback){
			baseService.query(moduleRoot+"/agreement/page",jsonObj,callback);
		};
        /**
         * 协议列表--新增协议信息
         * @param jsonObj
         * @param callback
         */
        this.create = function(jsonObj,callback){
            baseService.add(moduleRoot+"/agreement/create",jsonObj,callback);
        };
        /**
         * 协议列表--删除协议信息
         * @param jsonObj {id:'0333,0111'}
         * @param callback
         */
        this.remove = function(jsonObj,callback){
            baseService.remove(moduleRoot+"/agreement/delete",jsonObj,callback);
        };
        /**
         * 协议明细--查询协议明细信息
         * @param id
         * @param callback
         */
        this.show = function(jsonObj,callback){
            baseService.get(moduleRoot+"/agreement/show",jsonObj,callback);
        };
        /**
         * 修改协议信息
         * @param jsonObj
         * @param callback
         */
		this.update = function(jsonObj,callback){
			baseService.update(moduleRoot+"/agreement/update",jsonObj,callback);
		};
        /**
         * 影像删除
         * @param jsonObj
         * @param callback
         */
        this.deleteImgList = function(jsonObj,callback){
            baseService.remove("common/deleteFile",jsonObj,callback);
        };
        /**
         * 影像下载
         * @param jsonObj
         * @param callback
         */
        this.getImgInfo = function(jsonObj,callback){
            baseService.add("common/downloadFile",jsonObj,callback);
        };
        this.upload = function(callback){
            callback($http);
        }
        this.queryImgList = function(jsonObj,callback){
            baseService.query("common/file/list",jsonObj,callback);
        };
	}];
});
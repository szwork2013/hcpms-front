/**
 * Created by EX-CHENYONGHONG001 on 2014/5/15.
 */
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
         * 机构详情--查询机构详情
         * @param jsonObj
         * @param callback
         */
        this.queryProviderDetail = function(jsonObj,callback){
            baseService.get(moduleRoot+"/show",jsonObj,callback);
        };
        this.updateProviderDetail = function(jsonObj,callback){
            baseService.update(moduleRoot+"/update",jsonObj,callback);
        };
        /**
         * 机构详情--新增机构详情
         * @param jsonObj
         * @param callback
         */
        this.createProvider = function(jsonObj,callback){
            baseService.add(moduleRoot+"/create",jsonObj,callback);
        };
        this.deleteImgList = function(jsonObj,callback){
            baseService.remove("common/deleteFile",jsonObj,callback);
        };
        this.queryImgList = function(jsonObj,callback){
            baseService.query("common/file/list",jsonObj,callback);
        };
        this.getImgInfo = function(jsonObj,callback){
            baseService.add("common/downloadFile",jsonObj,callback);
        }
    }];
});
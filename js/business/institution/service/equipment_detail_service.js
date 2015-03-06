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
        var moduleRoot = "hcp/hcp/medical";
        /**
         * 机构详情--查询机构详情
         * @param jsonObj
         * @param callback
         */
        this.getEquipmentDetail = function(jsonObj,callback){
            baseService.get(moduleRoot+"/show",jsonObj,callback);
        };
        this.addEquipment = function(jsonObj,callback){
            baseService.add(moduleRoot+"/create",jsonObj,callback);
        };
        this.updateEquipmentDetail = function(jsonObj,callback){
            baseService.update(moduleRoot+"/update",jsonObj,callback);
        };
        this.queryEquipmentList = function(jsonObj,callback){
            baseService.query(moduleRoot+"/page",jsonObj,callback);
        };
        this.deleteEquipmentList = function(jsonObj,callback){
            baseService.remove(moduleRoot+"/delete",jsonObj,callback);
        };
    }];
});
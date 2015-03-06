/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-23
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	医生模块--RESTful服务
 */
define(function(){
	return ['$http','BaseService',function ($http,baseService) {
		var moduleRoot = "hcp/hcp/doctor";
        /**
         * 医生信息--查询列表信息
         * @param jsonObj
         * @param callback
         */
		this.queryDoctorInfoList = function(jsonObj,callback){
			baseService.query(moduleRoot+"/page",jsonObj,callback);
		};
        /**
         * 医生信息--新增
         * @param jsonObj
         * @param callback
         */
        this.addDoctorInfo = function(jsonObj,callback){
            baseService.add(moduleRoot+"/create",jsonObj,callback);
        };
        /**
         * 医生信息--查询明细
         * @param jsonObj
         * @param callback
         */
        this.getDoctorInfoDetail = function(jsonObj,callback){
            baseService.get(moduleRoot+"/show",jsonObj,callback);
        };
        /**
         * 医生信息--修改
         * @param jsonObj
         * @param callback
         */
        this.updateDoctorInfo = function(jsonObj,callback){
            baseService.update(moduleRoot+"/update",jsonObj,callback);
        };
        /**
         * 医生信息--删除
         * @param jsonObj
         * @param callback
         */
        this.deleteDoctorInfo = function(jsonObj,callback){
            baseService.remove(moduleRoot+"/delete",jsonObj,callback);
        };
	}];
});
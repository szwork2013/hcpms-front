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
        // 按总额付费方式接口
        this.queryGloList = function(params,callback){
            baseService.query(moduleRoot+"/agreement/globalbudget/page",params,callback);
        };
        this.getGloGetDetail = function(params,callback){
            baseService.get(moduleRoot+"/agreement/globalbudget/show",params,callback);
        };
        this.updateGloGet = function(params,callback){
            baseService.update(moduleRoot+"/agreement/globalbudget/update",params,callback);
        };
        this.addGloGet = function(params,callback){
            baseService.add(moduleRoot+"/agreement/globalbudget/create",params,callback);
        };
        this.deleteGloGet = function(params,callback){
            baseService.remove(moduleRoot+"/agreement/globalbudget/delete",params,callback);
        };
        // 按人头付费方式接口
        this.queryCapPayList = function(params,callback){
            baseService.query(moduleRoot+"/agreement/capitationpay/page",params,callback);
        };
        this.getCapPayDetail= function(params,callback){
            baseService.get(moduleRoot+"/agreement/capitationpay/show",params,callback);
        };
        this.updateCapPay= function(params,callback){
            baseService.update(moduleRoot+"/agreement/capitationpay/update",params,callback);
        };
        this.addCapPay= function(params,callback){
            baseService.add(moduleRoot+"/agreement/capitationpay/create",params,callback);
        };
        this.deleteCapPay= function(params,callback){
            baseService.remove(moduleRoot+"/agreement/capitationpay/delete",params,callback);
        };
       // 按项目付费方式接口
        this.getSerPayDetail = function(params,callback){
            baseService.get(moduleRoot+"/agreement/serviceitempay/show",params,callback);
        };
        this.querySerPayList = function(params,callback){
            baseService.query(moduleRoot+"/agreement/serviceitempay/page",params,callback);
        };
        this.updateSerPay = function(params,callback){
            baseService.update(moduleRoot+"/agreement/serviceitempay/update",params,callback);
        };
        this.addSerPay = function(params,callback){
            baseService.add(moduleRoot+"/agreement/serviceitempay/create",params,callback);
        };
        this.deleteSerPay = function(params,callback){
            baseService.remove(moduleRoot+"/agreement/serviceitempay/delete",params,callback);
        };
     // 按病种付费方式接口
        this.getDisPayDetail = function(params,callback){
            baseService.get(moduleRoot+"/agreement/diseasepay/show",params,callback);
        };
        this.queryDisPayList = function(params,callback){
            baseService.query(moduleRoot+"/agreement/diseasepay/page",params,callback);
        };
        this.updateDisPay = function(params,callback){
            baseService.update(moduleRoot+"/agreement/diseasepay/update",params,callback);
        };
        this.addDisPay = function(params,callback){
            baseService.add(moduleRoot+"/agreement/diseasepay/create",params,callback);
        };
        this.deleteDisPay = function(params,callback){
            baseService.remove(moduleRoot+"/agreement/diseasepay/delete",params,callback);
        };
        // 联动查询
        this.search = function(params,callback){
            baseService.post('common/code',params,callback);
        };
	}];
});
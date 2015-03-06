/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块--RESTful服务
 */
define(function(){
	return ['$http','BaseService','ConfigFactory',function ($http,baseService,ConfigFactory) {
		this.logOut = function(params,callback,errorback){
			$http({
                url:"logout",
                method:"POST",
                data:params,
                transformRequest:function(obj){
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }
                    return str.join('&');
                },
                header:{'Content-Type':'application/x-www-form-urlencoded'}
            }).success(callback).error(errorback);
		};
        /**
         * 查询支付方式：总额、人头、项目、病种
         * @param jsonObj
         * @param callback
         */
        this.getPayModeList = function(jsonObj,callback){
            var url = "common/code";
            url = !ConfigFactory.isDebug ? url : url + "/paymentMode";
            baseService.post(url,jsonObj,callback);
        };
        /**
         * 查询协议类型
         * @param jsonObj
         * @param callback
         */
        this.getAgreementType = function(jsonObj,callback){
            baseService.post("hcp/agreement/agreementtype",jsonObj,callback);
        };
        /**
         * 查询按总额付费：比例类型
         * @param jsonObj
         * @param callback
         */
        this.getRatioType = function(jsonObj,callback){
            baseService.post("hcp/agreement/ratiotype",jsonObj,callback);
        };
        /**
         * 查询按项目付费：科室
         * @param jsonObj
         * @param callback
         */
        this.getDepartment = function(jsonObj,callback){
            baseService.post("hcp/agreement/department",jsonObj,callback);
        };
        /**
         * 查询卫生机构类别
         * @param jsonObj
         * @param callback
         */
        this.getOrgType = function(jsonObj,callback){
            baseService.post("/hcp/hcp/orgtype",jsonObj,callback);
        };
	}];
});
/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	baseService提供Service的基本方法
 */
define(function (require) {
	'use strict';
	var baseService = ['$http','$rootScope','ConfigFactory','DictionaryFactory',
    function ($http,$rootScope,ConfigFactory,DictionaryFactory) {
        this.mockRoot = ConfigFactory.httpRootPath;
        /**
         * 响应请求结果统一处理
         * @param data
         * @param callback
         */
        var applyCallback = function(data,callback){
            if(data.state == '0'){
                callback(data);
            }else if(data.state == '1'){
            	dialog.alert('数据校验出错！' + data.errors);
            }else if(data.state == '2'){
            	dialog.alert(data.msg);
            }else if(data.state == '3'){
            	dialog.alert(data.msg);
            }else{
            	dialog.alert('系统繁忙请稍后再试！' + data.msg);
            }
        };
        var sessionInvalid = function(data){
            dialog.confirm('用户登录已过期，是否跳转到登录页面？',function(){
                window.location.href = "login.htm";
            });
        };
        /**
         * http基础服务调用
         * @param config
         * @param url
         * @param params
         * @param callback
         */
        this.http = function(config, url, params, callback){
            var realUrl = this.mockRoot + url;
            if(config.method == 'POST'){
                $http.post(realUrl,params).success(function(data) {
                    applyCallback(data,callback);
                }).error(function(data,status){
                    if(status=='600'){
                        sessionInvalid(data);
                    }
                });
            }else if(config.method == 'GET'){
                params = hcpms.utils.json2FormData(params);
                $http.get(realUrl+"?"+params, {
                    params:{}
                }).success(function(data) {
                    applyCallback(data,callback);
                }).error(function(data,status){
                    if(status=='600'){
                        sessionInvalid(data);
                    }
                });
            };
        };
		/**
		 * 获得对象
		 * @author EX-TANXINZHENG001
		 * @param url      {String} 请求的url
		 * @param params   {Objcet} 请求的参数对象
		 * @param callback {function} 请求的回调函数
		 */
		this.get = function(url, params, callback){
            var config = {
                method:'GET'
            };
            this.http(config,url,params,callback);
		};
		
		/**
		 * 获得数组对象
		 * @author EX-TANXINZHENG001
		 * @param url      {String} 请求的url
		 * @param params   {Objcet} 请求的参数对象
		 * @param callback {function} 请求的回调函数
		 */
		this.query = function(url, params, callback){
            this.get(url,params,callback);
		};
		/**
		 * POST请求
		 * @author EX-TANXINZHENG001
		 * @param url      {String} 请求的url
		 * @param params   {Objcet} 请求的参数对象
		 * @param callback {function} 请求的回调函数
		 */
		this.post = function(url, params, callback){
            var config = {
                method:'POST'
            };
            this.http(config,url,params,callback);
		};
		/**
		 * 新增请求
		 * @author EX-TANXINZHENG001
		 * @param url      {String} 请求的url
		 * @param params   {Objcet} 请求的参数对象
		 * @param callback {function} 请求的回调函数
		 */
		this.add = function(url, params, callback){
            this.post(url, params, callback);
		};
		/**
		 * 更新请求
		 * @author EX-TANXINZHENG001
		 * @param url      {String} 请求的url
		 * @param params   {Objcet} 请求的参数对象
		 * @param callback {function} 请求的回调函数
		 */
		this.update = function(url, params, callback){
            this.post(url, params, callback);
		};
		/**
		 * 删除操作
		 * @author EX-TANXINZHENG001
		 * @param url      {String} 请求的url
		 * @param params   {Objcet} 请求的参数对象
		 * @param callback {function} 请求的回调函数
		 */
		this.remove = function(url, params, callback){
            this.post(url, params, callback);
		};
        /**
         * 表单请求头提交
         * @param url
         * @param params
         * @param callback
         */
        this.submit = function(url, params, callback){
            $http({
                url:url,
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
            }).success(function(data) {
                applyCallback(data,callback);
            });
        };
        this.getBaseCode = function(params){
            var paramsObj = eval("("+params+")");
            var result = DictionaryFactory.getDataByCodeType(paramsObj.codeType);
            if(result != undefined){
                return result;
            }else {
                var dicUrl = !ConfigFactory.isDebug ? ConfigFactory.dictionaryHttpPath : ConfigFactory.dictionaryHttpPath+"/allCode";
                $http.post(dicUrl,paramsObj).success(function(data){
                    $rootScope.dictionaryMap[paramsObj.codeType] = data.result;
                    DictionaryFactory.putDictionaryMap(data.result);
                }).error(function (data, status) {
                    debug.info("获取基表数据字典失败。");
                    debug.info(data);
                });
            }
        }
	}];
	return baseService;
});
/**
 * CreatedBy: 	River Lee
 * CreateDate:	2014-05-26
 * Email:		ex-lijiang001@pingan.com.cn
 * Version:		0.0.1
 * Description:	配置文件
 */
define(function () {
    'use strict';
    var configFactory = function() {
        var isDevelopmentModel = true;//是否是开发模式
        return {
            isDebug : isDevelopmentModel,
            loginURL : isDevelopmentModel ? "mock/base/getNavInfo" : "login/principal",
            httpRootPath : isDevelopmentModel ?  "mock/" : "",
            dictionaryHttpPath : isDevelopmentModel ? 'mock/common/code' : 'common/code'
        }
    };
    return configFactory;
});
/**
 * Created by Jeng on 2014/5/9.
 */
define(function (require) {
    var appRoute = require('business/app/route/app_route');
    var appController = require('business/app/controller/app_ctrl');
    var appService = require('business/app/service/app_service');
    var init = function(ngAppModule){
        ngAppModule.service({
            AppService:appService
        }).controller({
            AppController:appController
        }).config(appRoute).run(['$rootScope', '$http','BaseService','DictionaryFactory','ConfigFactory',
            function ($rootScope, $http,baseService,DictionaryFactory,ConfigFactory) {
                //获得菜单信息
                $http.get(ConfigFactory.loginURL).success(function (data, status) {
                    $rootScope.navInfo = data.menu;
                    $rootScope.userName = data.userName;
                    var year = new Date().getFullYear() + "年";
                    var month = parseInt(new Date().getMonth())+1 + "月";
                    var date = new Date().getDate() + "日";
                    var time = "   " + new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
                    $rootScope.loginTime = year+month+date+time;
                }).error(function (data, status) {
                    dialog.confirm("登录超时，请重新登录！",function(){
                        window.location.href = "login.htm";
                    });
                });
                // 获取基表数据字典数据
                $rootScope.dictionaryMap = {};
	    }]);
    };
    return {
        init:init
    };
});
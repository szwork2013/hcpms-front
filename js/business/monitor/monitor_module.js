/**
 * Created by wanghua on 2014/5/27.
 * Description 监控路由
 */
define(function(require){
    var monitorService = require('business/monitor/service/monitor_service');
    var monitorCtrl = require('business/monitor/controllers/monitor_ctrl');
    var monitorRoute = require('business/monitor/route/monitor_route');
    var init = function(ngmonitorModule){
    	ngmonitorModule.service({
        	MonitorService:monitorService
        }).controller({
        	MonitorCtrl:monitorCtrl,
        }).config(monitorRoute);
    };
    return {
        init:init
    };
});
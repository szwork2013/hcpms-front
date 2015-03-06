/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块
 */
define(function(require){
	var performanceGenService = require('business/performance/service/performance_gen_service');
    var performanceViewService = require('business/performance/service/performance_view_service');
    var performanceGenCtrl = require('business/performance/controller/performance_gen_ctrl');
	var performanceViewCtrl = require('business/performance/controller/performance_view_ctrl');
	var performanceRoute = require('business/performance/route/performance_route');
	var init = function(ngPerformanceModule){
        ngPerformanceModule.service({
            PerformanceGenService:performanceGenService,
            PerformanceViewService:performanceViewService
		}).controller({
            PerformanceGenCtrl:performanceGenCtrl,
            PerformanceViewCtrl:performanceViewCtrl
		}).config(performanceRoute);
	};
	return {
		init:init
	};
});
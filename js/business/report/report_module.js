/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块
 */
define(function(require){

	var reportService = require('business/report/service/report_service');
	var reportPondCtrl = require('business/report/controller/report_pond_ctrl');
    var reportFeeCtrl = require('business/report/controller/report_fee_ctrl');
    var reportDiseaseCtrl = require('business/report/controller/report_disease_ctrl');
    var reportQualityCtrl = require('business/report/controller/report_quality_ctrl');
	var reportRoute = require('business/report/route/report_route');
	var init = function(ngReportModule){
        ngReportModule.service({
            ReportService:reportService
		}).controller({
            ReportPondCtrl:reportPondCtrl,
            ReportFeeCtrl:reportFeeCtrl,
            ReportDiseaseCtrl:reportDiseaseCtrl,
            ReportQualityCtrl:reportQualityCtrl
		}).config(reportRoute);
	};
	return {
		init:init
	};
});
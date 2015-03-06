/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-07
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	seajs加载配置文件
 */
define(function (require,exports,module) {
	'use strict';
	var init = function () {
        require('BaseModule');
        // 加载业务模块
		var agreementModule = require('AgreementModule'),
            institutionModule = require('InstitutionModule'),
            tourModule = require('TourModule'),
            monitorModule = require('MonitorModule'),
            performanceModule = require('PerformanceModule'),
            reportModule = require('ReportModule'),
            appModule = require('AppModule');
        // 定义业务模块
        var ngAgreementModule = angular.module('ngAgreementModule',[]),
            ngInstitutionModule = angular.module('ngInstitutionModule',[]),
            ngTourModule = angular.module('ngTourModule',[]),
            ngMonitorModule = angular.module('ngMonitorModule',[]),
            ngPerformanceModule = angular.module('ngPerformanceModule',[]),
            ngReportModule = angular.module('ngReportModule',[]);
        //依赖模块
        var requireModule = ['ngBaseModule',
            'ngReportModule','ngAgreementModule',
            'ngInstitutionModule','ngTourModule','ngMonitorModule',
            'ngPerformanceModule'];
        // 定义主模块
	    var ngAppModule = angular.module('HFApp',requireModule);
        // 主模块初始化
	    appModule.init(ngAppModule);

	    //业务模块初始化
        agreementModule.init(ngAgreementModule);
        institutionModule.init(ngInstitutionModule);
        tourModule.init(ngTourModule);
        monitorModule.init(ngMonitorModule);
        performanceModule.init(ngPerformanceModule);
        reportModule.init(ngReportModule);

        angular.bootstrap(document,['HFApp']);
	};
	return {
		init: init
	};
});
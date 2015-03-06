/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-07
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	seajs加载配置文件
 */
seajs.config({
	base:'js/',
	debug:false,
	alias: {
        Jquery:'lib/jquery/jquery.min'
        ,Angular:'lib/angular/angular.min'
        ,NgRoute:'lib/angular/angular-route'
        ,ConsoleLog:'lib/console/console'
        ,DateTime:'lib/datetime/datetime.min'
        ,App:'app'
        ,ModuleManager:'business/module_manager'
        ,BaseModule:'base/base_module'
        ,AppModule:'business/app/app_module'
        ,BaseService:'base/service/base_service'
        ,AgreementModule:'business/agreement/agreement_module'
        ,TourModule:'business/tour/tour_module'
        ,ReportModule:'business/report/report_module'
        ,PerformanceModule:'business/performance/performance_module'
        ,InstitutionModule:'business/institution/institution_module'
        ,MonitorModule:'business/monitor/monitor_module'
    },
    // 调试模式关闭版本控制
    /*map: [
     [ /^(.*\.(?:css|js))(.*)$/i, '$1?v='+(new Date()).getTime() ]
     ],*/
    charset: 'utf-8', 
    timeout: 20000
});
seajs.use('main');

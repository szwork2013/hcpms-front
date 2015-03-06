/**
 * Created by wanghua on 2014/5/27.
 * Description 监控路由
 */
define(function() {
    var tourRootPath =  "views/monitor/";
    return ['$routeProvider',function($routeProvider) {
        $routeProvider.when('/monitor/list', {
            controller:'MonitorCtrl',
            templateUrl : tourRootPath + 'monitor.htm',
            module:'monitor'
        }).otherwise({
            redirectTo : '/index'
        });
    }];
});
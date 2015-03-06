/**
 * Created by EX-lijiang001 on 2014/5/15.
 * Email ex-lijiang001
 * Description 巡查路由
 */
define(function() {
    var tourRootPath =  "views/tour";
    return ['$routeProvider',function($routeProvider) {
        $routeProvider.when('/tour/plan/list', {
            controller:'TourPlanCtrl',
            templateUrl : tourRootPath + '/plan/list.htm',
            module:'tourPlan'
        }).when('/tour/task/list', {
            controller:'TourTaskCtrl',
            templateUrl : tourRootPath + '/task/list.htm',
            module:'tourTask'
        }).otherwise({
            redirectTo : '/index'
        });
    }];
});
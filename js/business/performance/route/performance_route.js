define(function(require) {
    var performanceRootPath =  "views/performance";
    return ['$routeProvider',function($routeProvider) {
        $routeProvider.when('/performance/generation', {
            controller:'PerformanceGenCtrl',
            templateUrl : performanceRootPath + '/generation.htm',
            module:'performanceGeneration'
        }).when('/performance/view', {
            controller:'PerformanceViewCtrl',
            templateUrl : performanceRootPath + '/view.htm',
            module:'performanceView'
        });
    }];
});
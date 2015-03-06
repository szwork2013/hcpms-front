define(function(require) {
    var reportRootPath =  "views/report";
    return ['$routeProvider',function($routeProvider) {
        $routeProvider.when('/report/pond', {
            controller:'ReportPondCtrl',
            templateUrl : reportRootPath + '/pond.htm',
            module:'reportPond'
        }).when('/report/disease', {
            controller:'ReportDiseaseCtrl',
            templateUrl : reportRootPath + '/disease.htm',
            module:'reportDisease'
        }).when('/report/fee_control', {
            controller:'ReportFeeCtrl',
            templateUrl : reportRootPath + '/fee_control.htm',
            module:'reportFeeControl'
        }).when('/report/quality_control', {
            controller:'ReportQualityCtrl',
            templateUrl : reportRootPath + '/quality_control.htm',
            module:'reportQualityControl'
        });
    }];
});
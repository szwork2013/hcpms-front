define(function(require) {
    var agreementRootPath =  "views/agreement";
    return ['$routeProvider',function($routeProvider) {
        $routeProvider.when('/agreement/list', {
            controller:'AgreementListCtrl',
            templateUrl : agreementRootPath + '/list.htm',
            module:'agreement'
        }).when('/agreement/main:?',{
            controller:function($scope,$routeParams){
                $scope.UrlParams = $routeParams;
                $scope.isShow = 'detail';
                $scope.active = function(value,event){
                    $scope.isShow = value;
                    var target = event.target,
                        $target = $(target);
                    $target.parent().find("li").removeClass("active");
                    $target.addClass("active");
                    $scope.$broadcast('isUpdateRuleInfo',true);
                }
            },
            templateUrl:agreementRootPath + '/main.htm',
            module:'agreement'
        }).when('/agreement/detail:?', {
            controller:'AgreementDetailCtrl',
            templateUrl : agreementRootPath + '/detail.htm',
            module:'agreement'
        }).when('/agreement/prepayment:?', {
            controller:'AgreementPreAuthCtrl',
            templateUrl : agreementRootPath + '/prepayment.htm',
            module:'agreement'
        }).when('/agreement/payment:?', {
            controller:'AgreementPaymentCtrl',
            templateUrl : 'views/agreement/payment_detail.htm',
            module:'agreement'
        }).when('/test:?', {
            controller:'TestCtrl',
            templateUrl : 'views/test.htm'
        }).otherwise({
            redirectTo : '/index'
        });
    }];
});
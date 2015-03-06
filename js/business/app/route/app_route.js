define(function(require) {
    var commonRootPath = "views/common";
    return ['$routeProvider',function($routeProvider) {
        $routeProvider.when('/index', {
            redirectTo : '/welcome'
        }).when('/', {
            redirectTo : '/index'
        }).when('/welcome', {
            templateUrl : 'views/welcome.htm',
            module:'welcome'
        }).when('/error', {
            templateUrl : commonRootPath + '/error.htm'
        }).otherwise({
            redirectTo : '/error'
        });
    }];
});
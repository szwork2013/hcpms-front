define(function(require) {
    var institutionRootPath =  "views/institution";
    return ['$routeProvider',function($routeProvider) {
        $routeProvider.when('/institution/main:?', {
            controller:function($scope,$routeParams){
                $scope.UrlParams = $routeParams;
                $scope.isShow = 'baseInfo';
                $scope.active = function(value,event){
                    $scope.isShow = value;
                    var target = event.target;
                    var parent = target.parentElement;
                    var a = angular.element(parent).find('li');
                    angular.forEach(a,function(i){
                        i.className = "";
                    });
                    if(value == 'baseInfo'){
                        target.className = 'lb active';
                    }else if(value === 'ruleInfo'){
                    	target.className = 'active';
                    	$scope.$broadcast('isUpdateRuleInfo',true);
                    }else if(value === 'relationInfo' ){
                    	target.className = 'active';
                    	$scope.$broadcast('isUpdateRelation',true);
                    }else if(value === 'accountInfo'){
                    	target.className = 'active';
                    	$scope.$broadcast('isUpdateAccount',true);
                    }else{
                        target.className = 'active';
                    }
                }
            },
            templateUrl : institutionRootPath + '/main.htm',
            module:'institution'
        }).when('/institution/list:?', {
            controller:'InstitutionListCtrl',
            templateUrl : institutionRootPath + '/list.htm',
            module:'institution'
        }).when('/institution/base_info:?', {
            controller:'InstitutionDetailCtrl',
            templateUrl : institutionRootPath + '/base_info.htm',
            module:'baseInfo'
        }).when('/institution/equipment:?', {
            controller:'EquipmentDetailCtrl',
            templateUrl : institutionRootPath + '/equipment.htm',
            module:'institution'
        }).when('/institution/medical_list:?', {
            controller:'MedicalProjectListCtrl',
            templateUrl : institutionRootPath + '/medical_project_info_list.htm',
            module:'institution'
        }).when('/institution/relation_info:?', {
            controller:'InstitutionRelationCtrl',
            templateUrl : institutionRootPath + '/relation_info.htm',
            module:'institution'
        }).when('/institution/rule_info:?', {
            controller:'InstitutionRuleInfoCtrl',
            templateUrl : institutionRootPath + '/rule_info.htm',
            module:'institution'
        }).when('/institution/account_info:?', {
            controller:'InstitutionAccountInfoCtrl',
            templateUrl : institutionRootPath + '/account_info.htm',
            module:'institution'
        }).when('/institution/doctor_info:?', {
            controller:'InstitutionDoctorInfoCtrl',
            templateUrl : institutionRootPath + '/doctor_info.htm',
            module:'institution'
        });
    }];
});
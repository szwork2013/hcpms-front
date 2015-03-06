/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块-明细控制器
 */
define(function(){
	return  ['$scope', 'ReportService','$location','$routeParams',
	    function ($scope,reportService,$location,$routeParams) {
            /** url请求参数对象*/
            $scope.UrlParams = $routeParams;
            /**
             * 统计报表--生成报告
             */
            $scope.qualityParam = {};
            $scope.createQuality = function(){
                var params = $scope.qualityParam;
                reportService.createQuality(params,function(data){
                	dialog.alert(data.msg);
                });
            };
            $scope.periodChange = function(){
                var period = $scope.qualityParam.period;
                var a = parseInt(new Date().getFullYear());
                if(period == '1'){
                    var years = [];
                    for(var i=0;i< 5;i++){
                        years.push({code:a-i+"",text:a-i+'年'});
                    }
                    var months = [];
                    for(var i=1;i< 13;i++){
                        months.push({code:i+"",text:i+'月'});
                    }
                    $scope.years = years;
                    $scope.months = months;
                }else if(period == '2'){
                    var years = [];
                    for(var i=0;i< 5;i++){
                        years.push({code:a-i+"",text:a-i+'年'});
                    }
                    var months = [];
                    for(var i=1;i< 5;i++){
                        months.push({code:i+"",text:i+'季度'});
                    }
                    $scope.years = years;
                    $scope.months = months;
                }else if(period == '3'){
                    var years = [];
                    for(var i=1;i< 5;i++){
                        years.push({code:a-i+"",text:a-i+'年'});
                    }
                    $scope.years = years;
                    $scope.months = [];
                }
            };
            $scope.selectLocalYear = function(){
                var year = parseInt(new Date().getFullYear());
                var months = [];
                if(year == $scope.qualityParam.year){
                    if($scope.qualityParam.period =='1'){
                        var month = parseInt(new Date().getMonth())+1;
                        for(var i=1;i< month;i++){
                            months.push({code:i+"",text:i+'月'});
                        }
                    }else if($scope.qualityParam.period =='2'){
                        var month = parseInt(new Date().getMonth())+1;
                        var n = 0;
                        if(month>0&&month<4){
                            n = 1;
                        }else if(month>=4&&month<7){
                            n = 2;
                        }else if(month>=7&&month<10){
                            n = 3;
                        }else if(month>=10&&month<13){
                            n = 4;
                        }
                        for(var i=1;i< n;i++){
                            months.push({code:i+"",text:i+'季度'});
                        }
                    }
                }else if(year != $scope.qualityParam.year){
                    if($scope.qualityParam.period =='1'){
                        for(var i=1;i< 13;i++){
                            months.push({code:i+"",text:i+'月'});
                        }
                    }else if($scope.qualityParam.period =='2'){
                        for(var i=1;i< 5;i++){
                            months.push({code:i+"",text:i+'季度'});
                        }
                    }
                }
                $scope.months = months;
            };
            var init = function(){
                $scope.qualityParam.period = '1';
                $scope.periodChange();
            };
            init();
	    }
    ];
});
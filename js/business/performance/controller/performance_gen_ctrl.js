/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块-明细控制器
 */
define(function(require){
	return  ['$scope', 'PerformanceGenService','$location','$routeParams',
	    function ($scope,performanceGenService,$location,$routeParams) {
            /** 变量定义--performanceDetail缓存对象*/
            $scope.oldPerformanceDetail = {};
            /** url请求参数对象*/
            $scope.UrlParams = $routeParams;
            /**
             * 协议详细信息--查询
             * @param params
             */
            $scope.performanceParam = {
                page:"1",
                pageSize:"20"
            };
            $scope.getPerformanceList = function(){
                var pageInfo = $scope.pageInfo;
                var params = $scope.performanceParam;
                params.page = pageInfo&&pageInfo.curPage ||  params.page;
                params.pageSize = pageInfo&&pageInfo.limit || params.pageSize;
                performanceGenService.query(params,function(data){
                    $scope.performanceList = data.result;
                    //配置分页参数
                    $scope.pageInfo = {
                        curPage:params.page,
                        total:data.totals.total,
                        limit: params.pageSize,
                        loadData:$scope.getPerformanceList
                    };
                });
            };
            $scope.createList = function(){
                var params = [];
                var arr = $scope.generationIdList.split(',');
                for(var i=0;i<arr.length;i++){
                    var index = parseInt(arr[i]);
                    params.push($scope.performanceList[index]);
                }
                performanceGenService.create(params,function(data){
                    dialog.alert(data.msg);
                });
            };
            /**
             * 列表复选框--全选控制
             * @type {{}}
             */
            $scope.getGenerationIdList = function(domName,isArray,prefix){
                $scope.generationIdList = Utils.getCheckBoxValue(domName,isArray,prefix);
            };

            $scope.years = [];
            $scope.months = [];
            $scope.periodChange = function(index,period){
                var curYear = parseInt(new Date().getFullYear());
                $scope.years[index] = [];
                var years = [],i=(period == '1' || period == '2')?0:1;
                for(;i < 5;i++){
                    years.push({code:curYear-i+"",text:curYear-i+'年'});
                }
                $scope.years[index] = years;
                var selYear = $scope.performanceList[index].year;
                $scope.months[index] = [];
                if(selYear){
                	$scope.selectLocalYear(index,selYear);
                }

            };
            $scope.selectLocalYear = function(index,selYear){
                var year = parseInt(new Date().getFullYear());
                var months = [];
                var reprotCycle = $scope.performanceList[index].reprotCycle;
                if(year == selYear){
                    var month = parseInt(new Date().getMonth())+1;
                    if( reprotCycle === '1'){
                        for(var i=1;i< month;i++){
                            months.push({code:i+"",text:i+'月'});
                        }
                    }else if(reprotCycle === '2'){
                        var n = 0;
                        if(month>0 && month<4){
                            n = 1;
                        }else if(month>=4 && month<7){
                            n = 2;
                        }else if(month>=7 && month<10){
                            n = 3;
                        }else if(month>=10 && month<11){
                            n = 4;
                        }
                        for(var i=1;i< n;i++){
                            months.push({code:i+"",text:i+'季度'});
                        }
                    }
                }else{
                    if(selYear){
                        if(reprotCycle === '1'){
                            for(var i=1;i < 13;i++){
                                months.push({code:i+"",text:i+'月'});
                            }
                        }else if(reprotCycle === '2'){
                            for(var i=1;i < 5;i++){
                                months.push({code:i+"",text:i+'季度'});
                            }
                        }
                    }
                }
                $scope.months[index] = months;
            };
            /**
             * 初始化操作
             */
            var init = function(){
                var id = $scope.id;
                $scope.getPerformanceList();
            };
            init();
	    }
    ];
});
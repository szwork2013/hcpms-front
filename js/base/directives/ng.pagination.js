/**
* createdBy:river
* createDate:2014-05-09
* mail:ex-lijiang001
* 公共分页组件
* 例子：
* 将这个模块引入到主模块中，ngPagination.init(app); 传入模块对象将这个指令
* 添加到模块中，然后在页面中<pagination pg-page-info="pageInfo"></pagination>
* 不用使用跟【pgPageInfo】同名的参数
* 这个标签。
*	 注意：
*	pgPageInfo这值，在controller中要设置，【不需要】加{{}}，且必须是一个【对象】
* pgPageInfo = {
*	curPage:1,//当前页 {number}
*	total:100,//总记录数{number}
*	limit:10,//每页记录数{number}
*	loadData:$scope.query//执行的分页方法，即是页面的查询方法{function}
* }
*/
define(function(){
   // 'use strict';
	var init = function(appModule){
			appModule.directive('pagination', function() {
                var defaultOptions = {
                    limitList:[{
                        text:"10",
                        val:"10"
                    },{
                        text:"20",
                        val:"20"
                    },
                    {
                        text:"50",
                        val:"50"
                    }]
                };
				 return { 
				 	restrict: 'E', 
				 	scope : { pgPageInfo : '&pgPageInfo'}, 
				 	replace: true ,
				 	templateUrl : 'views/tpl/ngPagination.tpl',//模板url
				 	transclude : true, //嵌入
                    link:function($scope, $element, $attrs) {

                    },
				 	controller : function($scope, $element, $attrs){
				 		//监听数据是否变化变化则重新生成
				 		$scope.$watch($scope.pgPageInfo,function(newVal,oldVal){
                            if(newVal && newVal !== oldVal)
				 			    $scope.load();
				 		});
				 		$scope.load = function(){
				 			if($scope.pgPageInfo()){
                                var pgPageInfo = $scope.pgPageInfo(),
                                    totalPage = pgPageInfo.total,
                                    limit     = pgPageInfo.limit;
                                var curPage = $scope.curPage   = pgPageInfo.curPage;
						 		//计算总页数
						 		$scope.pageSize = totalPage % limit === 0 ? 
						 			parseInt(totalPage/limit) : parseInt(totalPage/limit)+1;
						 		if(curPage > $scope.pageSize){
						 			$scope.curPage = $scope.pageSize;
						 			$scope.pgPageInfo().curPage = $scope.pageSize;
						 			curPage = $scope.pageSize;
						 		}
						 		$scope.selLimit = limit;
						 		
						 		//分页列表
					 			$scope.pageList = [{
					 				name:'首页',
					 				pageNo:1,
					 				isInvalid: curPage != 1
					 			},{
					 				name:'上一页',
					 				pageNo:curPage-1,
					 				isInvalid: curPage != 1
					 			}];
					 			var pageNoShowNum = 3;
					 			//显示最大页数不能超过总页数
					 			pageNoShowNum = pageNoShowNum > $scope.pageSize ? $scope.pageSize : pageNoShowNum;
                                //当前现在的位置，比如说12，这组显示中处于第二的位置。
                                var curShowPos = curPage%pageNoShowNum;
                                //判断是否超过中位值

					 			//是否前后省略
					 			var isFront = curShowPos > pageNoShowNum/ 2,
					 			isRear = curShowPos < pageNoShowNum/2;
					 			//起始页
					 			var startPageNo = curPage - pageNoShowNum/2;
					 			//
					 			//拼接
					 			for(var i = startPageNo ; i <= pageNoShowNum; i++){
					 				$scope.pageList.push({
						 				name:i,
						 				pageNo:i,//如果是前后页码省略这里需要优化
						 				isInvalid: curPage !== this.pageNo,
						 				target: this.isInvalid ? 'i' : 'a'
					 				});
					 			}
					 			//追加尾页
								$scope.pageList.push({
					 				name:'下一页',
					 				pageNo:parseInt(curPage)+1,
					 				isInvalid: curPage != $scope.pageSize || $scope.pageSize <0
					 			},{
					 				name:'末页',
					 				pageNo:$scope.pageSize,
					 				isInvalid: curPage != $scope.pageSize || $scope.pageSize <0
					 			});
                                //记录数
                                $scope.limitList = pgPageInfo.limitList || defaultOptions.limitList;
				 			}
				 		};

				 		//加载分页
				 		$scope.load();

				 		//页面跳转
				 		$scope.skipPage = function(pageNo){
				 			if(pageNo > $scope.pageSize || pageNo < 1){
				 				dialog.alert("页码输入错误！");
				 				return;
				 			}
				 			$scope.pgPageInfo().curPage = pageNo;
				 			//重新生成分页
				 			$scope.load();
                            $scope.pgPageInfo().loadData();
				 		};
				 		//更改记录数
				 		$scope.changeLimit = function(){
				 			$scope.pgPageInfo().limit = $scope.selLimit;
				 			//重新生成分页
				 			$scope.load();
                            $scope.pgPageInfo().loadData();
				 		};
			 		
				 	}
				 }; 
			}); 
		}

		return {
			version:"0.1.1",
			init:init
		}
});
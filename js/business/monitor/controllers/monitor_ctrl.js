/**
 * Created by wanghua on 2014/5/27.
 * Description 监控路由
 */
define(function() {
    return ['$scope', 'MonitorService',
            function ($scope, MonitorService) {
       
    	 /**
         * 监控--查看数据库连接
         * @param id
         */
        $scope.monitorList = function(){
        	MonitorService.list(function(data){
                $scope.dbname = data.dbname;
                $scope.dbstate = data.dbstate;
            });
        };
        
        /**
         * 监控--清除结果
         * @param id
         */
        $scope.cleanList = function(){
        	MonitorService.list(function(data){
                $scope.dbname = null;
                $scope.dbstate = null;
            });
        };
        
    }];
});
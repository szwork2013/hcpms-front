/**
 * Created by EX-TANXINZHENG001 on 2014/5/12.
 * 模块管理方法
 * 传入模块定义
 * @param ngModuleDefine {Array}
 * {
 *  moduleName{String}:"",
 *  modulePath{String}:""//可以省略，将取moduleName的值去找模块，如果省略最好在config中配置路径以免出错
 *  requireMod{Array}:[],//依赖的模块
 *  initFun:{function} //初始化的方法
 * }
 */
define(function () {
    var ngModuleRegister = function(ngModuleDefine){
        for(var i = 0,def = ngModuleDefine;i<ngModuleDefine.length;i++){
            //创建模块添加依赖
            var curDef = def[i];
                defModule = angular.module(curDef.moduleName,curDef.requireMod || []);
            //调用初始化方法
            if(curDef.initFun){
                curDef.initFun.call(defModule);
            }

            //获得模块的定义,如果没有设置路径则通过模块名称去加载。
            var path = curDef.modulePath || curDef.moduleName;
            //加载模块
            seajs.use(path,function(initModule){
                if(!initModule){
                    //初始化模块
                    initModule.init(defModule);
                };
                if(curDef.isRoot){
                    angular.bootstrap(window.document,[curDef.moduleName])
                }
            });
        }
    };
    return {
        ngModuleRegister:ngModuleRegister
    };
});
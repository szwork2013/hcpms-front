/**
 * Created by Jeng on 2014/5/9.
 * Description:此BaseModule只定义整个系统中所依赖的BaseService、BaseController、BaseRoute
 * 这里存放所有的依赖模块和公共方法
 */
define(function (require) {
    /*require('lib/angular/angular-resource');*/
    require('NgRoute');

    var nav = require('base/directives/ng.navigation'),
        pagination = require('base/directives/ng.pagination'),
        dialog = require('base/directives/ng.dialog'),
        dic = require('base/directives/ng.dictionary'),
        printPage = require('base/directives/ng.printPage'),
        tab = require('base/directives/ng.tab'),
        popChoice = require('base/directives/ng.popChoice'),
        autoComplete = require('base/directives/ng.autoComplete') ;
    	dateTimePicker = require('base/directives/ng.dateTimePicker'),
        validation = require('base/directives/ng.validation'),
        autoFillSync = require('base/directives/ng.autoFillSync'),
        ieSelectFix = require('base/directives/ng.selectFix'),
        autoComplete = require('base/directives/ng.autoComplete');
 
    var baseService = require('base/service/base_service'),
        configFactory = require('base/service/config_factory'),
        dictionaryFactory = require('base/service/dictionary_factory');
    var ngBaseModule = angular.module('ngBaseModule',['ngRoute']);
    ngBaseModule.service({
        BaseService:baseService
    }).factory({
        ConfigFactory:configFactory,
        DictionaryFactory:dictionaryFactory
    });
    autoFillSync.init(ngBaseModule);
    nav.init(ngBaseModule);
    autoComplete.init(ngBaseModule);
    pagination.init(ngBaseModule);
    dialog.init(ngBaseModule);
    dic.init(ngBaseModule);
    printPage.init(ngBaseModule);
    ieSelectFix.init(ngBaseModule);
    tab.init(ngBaseModule);
    popChoice.init(ngBaseModule);
    dateTimePicker.init(ngBaseModule);
    validation.init(ngBaseModule);
    autoComplete.init(ngBaseModule);
    return {
        BaseService:baseService
    };
});
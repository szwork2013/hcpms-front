/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-30
 * Email:		ex-lijiang001@pingan.com.cn
 * Version:		0.0.1
 * Description:	基础数据字典
 */
define(function () {
    'use strict';
    var dictionaryFactory = function($http){
        var dictionaryMap = {};
        var setDictionaryMap = function(data){
            dictionaryMap = data;
        };
        var putDictionaryMap = function(data){
            angular.forEach(data, function (value, key) {
                dictionaryMap[key] = value;
            });
        };
        var getDictionaryMap = function(){
            return dictionaryMap;
        };
        var getDataByCodeType = function(param,callback){
            return dictionaryMap[param];
        };
        return {
            dictionaryMap:dictionaryMap,
            setDictionaryMap:setDictionaryMap,
            getDictionaryMap:getDictionaryMap,
            getDataByCodeType:getDataByCodeType,
            putDictionaryMap:putDictionaryMap
        }
    };
    return dictionaryFactory;
});
/**
 * Created by EX-lijiang001 on 2014/5/16.
 * 字典公共方法
 * @param $attrs {object}
 * dic       字典数据来源和显示方式设置
 * dicAffect  级联影响
 * dicParams  请求参数
 * dicDefVal  默认值
 * dicDelimiter 分割符，如果存在分隔符，就在下拉选项中添加描述。
 *  <select dic="值|显示值 参数" dicDefVal="---请选择---"
 *      dicAffect="影响的ng-model" dicParams="{param:?,level:1}"
 *      dicDelimiter="|"></select>
 *
 *  dicAffect和dicParams要同时使用，级联影响字段会替换掉参数中的占位符
 *  合并到请求参数中
 */
define(function(){
    var init = function(appModule){
        appModule.directive('dic', ['$compile','$http','ConfigFactory',function($compile,$http,ConfigFactory) {
            //参数占位符
            var Placeholder = "?";
            return {
                scope:{
                    dicAffect:'&'
                },
                require: ['select','?ngModel'],
                controller: ['$element', '$scope', '$attrs', function($element, $scope, $attrs) {

                }],
                link:function($scope, $element, $attrs,ctrl) {
                   var selectCtrl = ctrl[0],
                       ngModelCtrl = ctrl[1];

                    if(!ngModelCtrl){
                        return;
                    }

                    var dic = $attrs.dic.split(" "),
                        dataObj = dic[1];
                    //如果没有设置显示值则同值显示一致
                    var val = dic[0].split("|")[0],
                        desc = dic[0].split("|")[1] || val;

                    //获得请求url
                    var dicUrl = ConfigFactory.isDebug?"mock/common/code/"+dataObj:"common/code",
                        params = {"codeType":dataObj};
                    
                    var  createOption = function(data){
                        ngModelCtrl.$render = function() {
                            var viewValue = ngModelCtrl.$viewValue;
                        }
                        //添加默认选项
                        var dicHtml = $attrs.dicDefVal?['<option value="">'+$attrs.dicDefVal+'</option>']:[];
                        var isSeled = function(val){
                            //这里应该做ngModel为空判断，不能为空
                            return (ngModelCtrl && val == ngModelCtrl.$viewValue)?"selected":"";
                        };
                        var showVal = function(val,desc){
                            return val+""+($attrs.dicDelimiter?$attrs.dicDelimiter+desc:"");
                        }
                        if(data){
                        	 var dicData =  data.result
                             if(dicData && angular.isArray(dicData)){
                                 //这个版本只能处理下拉
                                 for(var i = 0 ; i < dicData.length ; i++){
                                     dicHtml.push('<option value="'+showVal(dicData[i][val],dicData[i][desc])+'" '+isSeled(dicData[i][val])+'>'+dicData[i][desc]+'</option>');
                                 }
                             }
                        }
                        $element.html('').append(dicHtml.join(""));
                    };

                    var initOption =function(paramVal){
                        //如果有依赖对象，没有值则不显示下拉
                        if((paramVal && $attrs.dicAffect) || !$attrs.dicAffect){
                            //如果没有设置参数，即使有依赖也不生成
                            if($attrs.dicParam){
                                var dicParams = $attrs.dicParam;
                                //将依赖的参数绑定到占位符中
                                dicParams=dicParams.replace(Placeholder,"'"+paramVal+"'");
                                eval("dicParams = "+dicParams);
                                angular.extend(params,dicParams);
                            }
                            //params = hcpms.utils.json2FormData(params);
                            //获得字典数据
                            //$http.post(dicUrl+"?"+params).success(function(data) {
                            $http.post(dicUrl,params).success(function(data) {
                                createOption(data);
                            });
                        }else{
                        	 createOption();
                        };

                    }

                   //监控影响对象，如果变动则改变下拉选项
                   $scope.$watch($scope.dicAffect,function(newVal,oldVal){
                       if(newVal != oldVal){
                           initOption(newVal);
                       }
                    });
                    initOption();
                    $scope.$watch(function(newVal){
                    	$element.val(ngModelCtrl.$viewValue)
                    });
		
                   /* //当值改变调整选项的值
                    $element.on("change",function(){
                        $scope.$apply(function() {
                            var array = {};
                           angular.forEach($element.find('option'), function(option) {
                                if (option.selected) {
                                    array = option.value;
                                }
                            });
                            ngModelCtrl.$setViewValue(array);
                        });
                    });*/
                 }
            };
        }]);
    };
    return {
        version:"0.1.5",
        init:init
    }
});
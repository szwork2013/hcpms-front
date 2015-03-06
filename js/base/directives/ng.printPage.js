/**
 * created by River Lee on 2014-05-16
 *  页面打印功能
 *  @template-url 模板加载路径
 *  @print-data-url 数据提供路径
 *  <a print-page template-url="views/tour/task/print.htm" print-data-url="mock/hcp/tour/plan/show">打印</a>
 *
 *  在模板文件中，所有的数据都是存放在$scope.printData中
 *
 *  例如返回数据：
 *  "tourInspectItems":[
 *      {
 *          "createdTime":"2014-05-07 00:00:00",
			 "createdUser":"hunter",
 *      }
 *  ]
 *  在模板中使用这样的数据怎么使用
 *
 *  <li ng-repeat="item in printData.tourInspectItems">{{item.createdTime}}</li>
 *  所有返回的对象是存放在【printData】这个里面的。
 */
define([], function () {
    var init = function (appModule) {
        appModule.directive('printPage',
            ['$compile',
            '$http',
            '$timeout',
            'ConfigFactory',
                function ($compile,
                           $http,
                           $timeout,
                           ConfigFactory) {
            //创建打印iframe块
            var _create = function () {
                var iframe = document.getElementById("printIframe");
                if (!iframe) {
                    iframe = document.createElement("iframe");
                    iframe.setAttribute("id", "printIframe");
                    iframe.style.cssText = "position:absolute;width:0px;height:0px;left:-500px;top:-500px";
                    document.body.appendChild(iframe);
                }
            }
            //打印页面
            var printPage = function (htmlTpl) {
                $timeout(function(){
                    var iframe = document.getElementById("printIframe");
                    var iframeWin = iframe.contentWindow;
                    iframeWin.document.body.innerHTML="";//清空文档
                    ///追加模板节点
                    angular.forEach(htmlTpl, function (dom) {
                        iframeWin.document.body.appendChild(dom);
                    });

                    iframeWin.close();
                    iframeWin.focus();
                    iframeWin.print();
                },100);
            };
            //存放HTMl模板，同一个URL只请求一次
            var htmlTemplate = {};
            var ctrl = function ($scope, $element, $attrs) {
                //创建打印iframe
                _create();

                $element.on("click", function () {
                    $http.get(ConfigFactory.httpRootPath+$attrs.printDataUrl).success(function (data) {
                        $scope = $scope.$new();
                        $scope.printData = data.result;
                        //判断模板是否被加载
                        if(!htmlTemplate[$attrs.templateUrl]) {
                            $http.get($attrs.templateUrl).success(function (html) {
                                htmlTemplate[$attrs.templateUrl] = html;
                                printPage($compile(htmlTemplate[$attrs.templateUrl])($scope));
                            });
                        }else{
                            printPage($compile(htmlTemplate[$attrs.templateUrl])($scope));
                        }

                    });
                });

            }
            return {
                compile: function () {
                },
                link: function (scope, elm, attr, ctrl) {
                },
                controller: ctrl
            };
        }]);
    }

    return {
        version: "0.0.1",
        init: init
    }
});
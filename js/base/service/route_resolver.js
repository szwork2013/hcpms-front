/**
 * Created by EX-LIJIANG001 on 2014/6/9.
 */
define(function () {
    'use strict';
    var routeResolver = function () {
        this.$get = function () {
            return this;
        };
        this.routeConfig = function () {
            var viewsDirectory = '',
                controllersDirectory = '',
                $controllerProvider ,
                setBaseDirectories = function (viewsDir, controllersDir) {
                    viewsDirectory = viewsDir;
                    controllersDirectory = controllersDir;
                },
                getViewsDirectory = function () {
                    return viewsDirectory;
                },
                getControllersDirectory = function () {
                    return controllersDirectory;
                },
                setControllerProvider = function (ctrlPro) {
                    $controllerProvider = ctrlPro;
                },
                getControllerProvider = function () {
                    return $controllerProvider;
                }
            return {
                setBaseDirectories: setBaseDirectories,
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory,
                setControllerProvider: setControllerProvider,
                getControllerProvider: getControllerProvider
            };
        }();
        this.route = function () {
            var resolve = function (ctrlName, ctrlPath, htmlPath, module,$controllerProvider) {
                var routeDef = {};
                routeDef.templateUrl = htmlPath + '.htm';
                routeDef.controller = ctrlName;
                routeDef.resolve = { load: [
                    '$q', '$rootScope', function ($q, $rootScope) {
                        var dependencies = [ctrlPath];
                        var defer = $q.defer();
                        seajs.use(dependencies,
                            function (ctrl) {
                                $controllerProvider.register(ctrlName, ctrl);
                                defer.resolve();
                                $rootScope.$apply()
                            });
                        return defer.promise;
                    }]
                };
                routeDef.module = module;
                return routeDef;
            }
            return { resolve: resolve }
        }();
    }
    return routeResolver;
});
/**
 * Created by EX-lijiang001 on 2014/5/15.
 * Email ex-lijiang001
 * Description 巡查模块
 */
define(function(require){
    var tourService = require('business/tour/services/tour_service');
    var tourPlanCtrl = require('business/tour/controllers/tour_plan_ctrl');
    var tourTaskCtrl = require('business/tour/controllers/tour_task_ctrl');
    var tourRoute = require('business/tour/route/tour_route');
    var init = function(ngtourModule){
        ngtourModule.service({
            TourService:tourService
        }).controller({
            TourPlanCtrl:tourPlanCtrl,
            TourTaskCtrl:tourTaskCtrl
        }).config(tourRoute);
    };
    return {
        init:init
    };
});
/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-06
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	协议模块
 */
define(function(require){
	var agreementService = require('business/agreement/service/agreement_service');
    var agreementPreAuthService = require('business/agreement/service/agreement_pre_auth_service');
    var agreementPayModeService = require('business/agreement/service/agreement_pay_mode_service');
    var agreementDetailCtrl = require('business/agreement/controller/agreement_detail_ctrl');
	var agreementListCtrl = require('business/agreement/controller/agreement_list_ctrl');
    var agreementPreAuthCtrl = require('business/agreement/controller/agreement_pre_auth_ctrl');
	var agreementPaymentCtrl = require('business/agreement/controller/agreement_pay_ctrl');
	var agreementRoute = require('business/agreement/route/agreement_route');
    var testCtrl = require('business/agreement/controller/test_ctrl');
	var init = function(ngAgreementModule){
        ngAgreementModule.service({
			AgreementService:agreementService,
            AgreementPreAuthService:agreementPreAuthService,
            AgreementPayModeService:agreementPayModeService
		}).controller({
			AgreementDetailCtrl:agreementDetailCtrl,
			AgreementListCtrl:agreementListCtrl,
            AgreementPreAuthCtrl:agreementPreAuthCtrl,
            AgreementPaymentCtrl:agreementPaymentCtrl,
            TestCtrl:testCtrl
		}).config(agreementRoute);
	};
	return {
		init:init
	};
});
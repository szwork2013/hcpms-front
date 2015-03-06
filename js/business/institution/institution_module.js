/**
 * CreatedBy: 	Jeng Tam
 * CreateDate:	2014-05-15
 * Email:		ex-tanxinzheng@pingan.com.cn
 * Version:		0.0.1
 * Description:	医疗机构模块
 */
define(function(require){
    var institutionListService = require('business/institution/service/institution_list_service');
    var institutionListCtrl = require('business/institution/controller/institution_list_ctrl');
    var institutionDetailService = require('business/institution/service/institution_detail_service');
    var institutionDetailCtrl = require('business/institution/controller/institution_detail_ctrl');
    var diagnosisListService = require('business/institution/service/diagnosis_list_service');
    var equipmentDetailService = require('business/institution/service/equipment_detail_service');
    var diagnosisListCtrl = require('business/institution/controller/diagnosis_list_ctrl');
    var ruleInfoService = require('business/institution/service/institution_rule_info_service');
    var ruleInfoCtrl = require('business/institution/controller/institution_rule_info_ctrl');
    var equipmentDetailCtrl = require('business/institution/controller/equipment_detail_ctrl');
    var relationService = require('business/institution/service/institution_relation_service');
    var relationCtrl = require('business/institution/controller/institution_relation_ctrl');
    var accountInfoService = require('business/institution/service/institution_account_info_service');
    var accountInfoCtrl = require('business/institution/controller/institution_account_info_ctrl');
    var doctorInfoService = require('business/institution/service/institution_doctor_info_service');
    var doctorInfoCtrl = require('business/institution/controller/institution_doctor_info_ctrl');
    var medicalProjectService = require('business/institution/service/medical_project_service');
    var medicalProjectListCtrl = require('business/institution/controller/medical_project_ctrl');

    var institutionRoute = require('business/institution/route/institution_route');
    var init = function(ngInstitutionModule){
        ngInstitutionModule.service({
            InstitutionListService:institutionListService,
            DiagnosisListService:diagnosisListService,
            InstitutionDetailService:institutionDetailService,
            InstitutionRuleInfoService:ruleInfoService,
            EquipmentDetailService:equipmentDetailService,
            InstitutionRelationService:relationService,
            InstitutionAccountInfoService:accountInfoService,
	        MedicalProjectService:medicalProjectService,
            InstitutionDoctorInfoService:doctorInfoService
        }).controller({
            InstitutionListCtrl:institutionListCtrl,
            DiagnosisListCtrl:diagnosisListCtrl,
            InstitutionDetailCtrl:institutionDetailCtrl,
            InstitutionRuleInfoCtrl:ruleInfoCtrl,
            EquipmentDetailCtrl:equipmentDetailCtrl,
            InstitutionRelationCtrl:relationCtrl,
            InstitutionAccountInfoCtrl:accountInfoCtrl,
	        MedicalProjectListCtrl:medicalProjectListCtrl,
            InstitutionDoctorInfoCtrl:doctorInfoCtrl
        }).config(institutionRoute);
    };
    return {
        init:init
    };
});
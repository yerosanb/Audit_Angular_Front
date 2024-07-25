import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControllableExpenseReviewerRectificationTrackerComponent } from './branch_audit/Controllable_Expense/reviewer/controllable-expense-reviewer-rectification-tracker/controllable-expense-reviewer-rectification-tracker.component';
import { MemorandomContingentReportedBranchManagerComponent } from './branch_audit/MCA/branch-manager/memorandom-contingent-reported-branch-manager/memorandom-contingent-reported-branch-manager.component';
import { CashCountReviewerRectificationTrackerComponent } from './branch_audit/cash_count/reviewer/cash-count-reviewer-rectification-tracker/cash-count-reviewer-rectification-tracker.component';
import { DormantInactiveReviewerRectificationTrackerComponent } from './branch_audit/dormant-inactive-account/reviewer/dormant-inactive-reviewer-rectification-tracker/dormant-inactive-reviewer-rectification-tracker.component';
import { GeneralObservationReviewerRectificationTrackerComponent } from './branch_audit/general_observation_and_comment/reviewer/general-observation-reviewer-rectification-tracker/general-observation-reviewer-rectification-tracker.component';
import { LoanAndAdvanceReviewerRectificationTrackerComponent } from './branch_audit/loan_and_advance/Reviewer/loan-and-advance-reviewer-rectification-tracker/loan-and-advance-reviewer-rectification-tracker.component';
import { LongOutstandingReviewerRectificationTrackerComponent } from './branch_audit/long_outstanding_item/reviewer/long-outstanding-reviewer-rectification-tracker/long-outstanding-reviewer-rectification-tracker.component';
import { ReportSuspenseAccountComponent } from './branch_audit/report/general/report-suspense-account/report-suspense-account.component';
import { SuspenseAccountReviewerRectificationTrackerComponent } from './branch_audit/suspense_account/reviewer/suspense-account-reviewer-rectification-tracker/suspense-account-reviewer-rectification-tracker.component';
import { DashboardContainerComponent } from './pages/dashboard/dashboard-container/dashboard-container.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { InvalidTokenComponent } from './pages/invalid-token/invalid-token.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { AuthGuard } from './services/shared/auth.guard';

import { CommonFindingComponent } from './components/common/common-finding/common-finding.component';
import { NeedHelpComponent } from './components/common/contacts/need-help/need-help.component';
import { ManageCommonFindingComponent } from './components/common/manage-common-finding/manage-common-finding.component';
import { ManageRecommendationComponent } from './components/common/manage-recommendation/manage-recommendation.component';
import { RecommendationComponent } from './components/common/recommendation/recommendation.component';
import { SignupComponent } from './pages/signup/signup.component';

import { AuditorMemorandumDraftingComponent } from './branch_audit/MCA/auditor/auditor-memorandum-drafting/auditor-memorandum-drafting.component';
import { AbnormalBalanceDraftingBranchComponent } from './branch_audit/abnormal-balance/auditor/abnormal-balance-drafting-branch/abnormal-balance-drafting-branch.component';
import { AbnormalBalancePassedBranchComponent } from './branch_audit/abnormal-balance/auditor/abnormal-balance-passed-branch/abnormal-balance-passed-branch.component';
import { AbnormalBalancePendingBranchManagerComponent } from './branch_audit/abnormal-balance/branch_manager/abnormal-balance-pending-branch-manager/abnormal-balance-pending-branch-manager.component';
import { AbnormalBalancePendingForReviewerBranchComponent } from './branch_audit/abnormal-balance/reviewer/abnormal-balance-pending-for-reviewer-branch/abnormal-balance-pending-for-reviewer-branch.component';
import { AbnormalBalanceReviewedBranchComponent } from './branch_audit/abnormal-balance/reviewer/abnormal-balance-reviewed-branch/abnormal-balance-reviewed-branch.component';
import { AssetLiabilityDraftingBranchComponent } from './branch_audit/asset-liability/auditor/asset-liability-drafting-branch/asset-liability-drafting-branch.component';
import { AssetLiabilityPassedBranchComponent } from './branch_audit/asset-liability/auditor/asset-liability-passed-branch/asset-liability-passed-branch.component';
import { AssetLiabilityPendingBranchManagerComponent } from './branch_audit/asset-liability/branch_manager/asset-liability-pending-branch-manager/asset-liability-pending-branch-manager.component';
import { AssetLiabilityPendingForReviewBranchComponent } from './branch_audit/asset-liability/reviewer/asset-liability-pending-for-review-branch/asset-liability-pending-for-review-branch.component';
import { AssetLiabilityReviewedBranchComponent } from './branch_audit/asset-liability/reviewer/asset-liability-reviewed-branch/asset-liability-reviewed-branch.component';
import { AtmCardDraftingFindingComponent } from './branch_audit/atm_card/auditor/atm-card-drafting-finding/atm-card-drafting-finding.component';
import { AtmCardPassedFindingComponent } from './branch_audit/atm_card/auditor/atm-card-passed-finding/atm-card-passed-finding.component';
import { AtmCardPendingBranchMangerComponent } from './branch_audit/atm_card/branch_manager/atm-card-pending-branch-manger/atm-card-pending-branch-manger.component';
import { AtmCardPendingComponent } from './branch_audit/atm_card/reviewer/atm-card-pending/atm-card-pending.component';
import { AtmCardReviewedReviewerComponent } from './branch_audit/atm_card/reviewer/atm-card-reviewed-reviewer/atm-card-reviewed-reviewer.component';
import { CashPerformanceDraftingComponent } from './branch_audit/cash_performance/auditor/cash-performance-drafting/cash-performance-drafting.component';
import { ReviewerCashPerformancePendingComponent } from './branch_audit/cash_performance/reviewer/reviewer-cash-performance-pending-reviewer/reviewer-cash-performance-pending.component';
import { ReviewerCashPerformanceReviewedComponent } from './branch_audit/cash_performance/reviewer/reviewer-cash-performance-reviewed/reviewer-cash-performance-reviewed.component';
import { DormantInactiveAccountDraftingComponent } from './branch_audit/dormant-inactive-account/auditor/dormant-inactive-account-drafting/dormant-inactive-account-drafting.component';
import { DormantInactiveAccountPassedBranchComponent } from './branch_audit/dormant-inactive-account/auditor/dormant-inactive-account-passed-branch/dormant-inactive-account-passed-branch.component';
import { DormantInactiveAccountPendingForReviewBranchComponent } from './branch_audit/dormant-inactive-account/reviewer/dormant-inactive-account-pending-for-review-branch/dormant-inactive-account-pending-for-review-branch.component';
import { DormantInactiveAccountReviewedBranchComponent } from './branch_audit/dormant-inactive-account/reviewer/dormant-inactive-account-reviewed-branch/dormant-inactive-account-reviewed-branch.component';
import { GeneralObservationDraftingBranchComponent } from './branch_audit/general_observation_and_comment/Auditor/general-observation-drafting-branch/general-observation-drafting-branch.component';
import { IncompleteAccountDraftingBranchComponent } from './branch_audit/incomplete-document-account/auditor/incomplete-account-drafting-branch/incomplete-account-drafting-branch.component';
import { IncompleteAccountOnProgressBranchComponent } from './branch_audit/incomplete-document-account/auditor/incomplete-account-on-progress-branch/incomplete-account-on-progress-branch.component';
import { IncompleteAccountPassedBranchComponent } from './branch_audit/incomplete-document-account/auditor/incomplete-account-passed-branch/incomplete-account-passed-branch.component';
import { IncompleteDocumentPendingBranchManagerComponent } from './branch_audit/incomplete-document-account/branch_manager/incomplete-document-pending-branch-manager/incomplete-document-pending-branch-manager.component';
import { IncompleteAccountOnProgressForReviewerBranchComponent } from './branch_audit/incomplete-document-account/reviewer/incomplete-account-on-progress-for-reviewer-branch/incomplete-account-on-progress-for-reviewer-branch.component';
import { IncompleteAccountPendingForReviewBranchComponent } from './branch_audit/incomplete-document-account/reviewer/incomplete-account-pending-for-review-branch/incomplete-account-pending-for-review-branch.component';
import { IncompleteAccountReviewedBranchComponent } from './branch_audit/incomplete-document-account/reviewer/incomplete-account-reviewed-branch/incomplete-account-reviewed-branch.component';
import { OperatioalDescripancyDraftingAuditorBranchComponent } from './branch_audit/operational-descripancy/auditor/operatioal-descripancy-drafting-auditor-branch/operatioal-descripancy-drafting-auditor-branch.component';
import { OperatioalDescripancyPassedAuditorBranchComponent } from './branch_audit/operational-descripancy/auditor/operatioal-descripancy-passed-auditor-branch/operatioal-descripancy-passed-auditor-branch.component';
import { OperationalDescripancyCategoryComponent } from './branch_audit/operational-descripancy/auditor/operational-descripancy-category/operational-descripancy-category.component';
import { OperationalDescripancyBranchManagerComponent } from './branch_audit/operational-descripancy/branch_manager/operational-descripancy-branch-manager/operational-descripancy-branch-manager.component';
import { RegionalCompiledAuditsProgressComponent } from './branch_audit/regional_compiled_audits/regional-compiled-audits-progress/regional-compiled-audits-progress.component';
import { RegionalCompiledFindingsPendingComponent } from './branch_audit/regional_compiled_audits/regional-compiled-findings-pending/regional-compiled-findings-pending.component';
import { PassedStatusOfAuditComponent } from './branch_audit/statusofaudit/auditor/passed-status-of-audit/passed-status-of-audit.component';
import { StatusofauditreviewComponent } from './branch_audit/statusofaudit/reviewer/statusofauditreview/statusofauditreview.component';
import { StatusofauditComponent } from './branch_audit/statusofaudit/statusofaudit.component';

import { GeneralObservationPendingBranchComponent } from './branch_audit/general_observation_and_comment/reviewer/general-observation-pending-branch/general-observation-pending-branch.component';
import { GeneralObservationReviewedBranchComponent } from './branch_audit/general_observation_and_comment/reviewer/general-observation-reviewed-branch/general-observation-reviewed-branch.component';

import { AuditorCashManagementPassedComponent } from './branch_audit/Cash_Management_Branch/auditor/auditor-cash-management-passed/auditor-cash-management-passed.component';
import { AuditorCashManagementPendingComponent } from './branch_audit/Cash_Management_Branch/auditor/auditor-cash-management-pending/auditor-cash-management-pending.component';
import { MemorandumPassedComponent } from './branch_audit/MCA/auditor/memorandum-passed/memorandum-passed.component';
import { ReviewerMemorandumDraftingComponent } from './branch_audit/MCA/reviewer/reviewer-memorandum-drafting/reviewer-memorandum-drafting.component';
import { ReviewerMemorandumPassedComponent } from './branch_audit/MCA/reviewer/reviewer-memorandum-passed/reviewer-memorandum-passed.component';

import { CompiledApprovedAuditsBranchComponent } from './branch_audit/approver/compiled-approved-audits-branch/compiled-approved-audits-branch.component';
import { CompiledPendingAuditsBranchComponent } from './branch_audit/approver/compiled-pending-audits-branch/compiled-pending-audits-branch.component';
import { CashcountdraftComponent } from './branch_audit/cash_count/auditor/cashcountdraft/cashcountdraft.component';
import { CashcountpassedComponent } from './branch_audit/cash_count/auditor/cashcountpassed/cashcountpassed.component';
import { CompiledAuditsDivisionComponent } from './branch_audit/division_compiler/common/compiled-audits-division/compiled-audits-division.component';
import { CompiledAuditsProgressDivisionComponent } from './branch_audit/division_compiler/common/compiled-audits-progress-division/compiled-audits-progress-division.component';
import { LoanAndAdvanceDraftedBranchComponent } from './branch_audit/loan_and_advance/Auditor/loan-and-advance-drafted-branch/loan-and-advance-drafted-branch.component';
import { LoanAndAdvancePassedBranchComponent } from './branch_audit/loan_and_advance/Auditor/loan-and-advance-passed-branch/loan-and-advance-passed-branch.component';
import { LoanAndAdvancePendingBranchComponent } from './branch_audit/loan_and_advance/Reviewer/loan-and-advance-pending-branch/loan-and-advance-pending-branch.component';
import { LoanAndAdvanceReviewedBranchComponent } from './branch_audit/loan_and_advance/Reviewer/loan-and-advance-reviewed-branch/loan-and-advance-reviewed-branch.component';
import { StatusofauditunreviewComponent } from './branch_audit/statusofaudit/reviewer/statusofauditunreview/statusofauditunreview.component';

import { CompiledIncompleteDocumentAccountDivisionComponent } from './branch_audit/division_compiler/compiled-incomplete-document-account-division/compiled-incomplete-document-account-division.component';
import { CompiledIncompleteDocumentReviewedDivisionComponent } from './branch_audit/division_compiler/compiled-incomplete-document-account-division/compiled-incomplete-document-reviewed-division/compiled-incomplete-document-reviewed-division.component';
import { NegotiableInstrumentDraftingBranchComponent } from './branch_audit/negotiable_instrument/auditor/negotiable-instrument-drafting-branch/negotiable-instrument-drafting-branch.component';
import { NegotiableInstrumentPassedBranchComponent } from './branch_audit/negotiable_instrument/auditor/negotiable-instrument-passed-branch/negotiable-instrument-passed-branch.component';
import { NegotiableStockItemManagementComponent } from './branch_audit/negotiable_instrument/auditor/negotiable-stock-item-management/negotiable-stock-item-management.component';

import { ReviewerCashManagementPendingComponent } from './branch_audit/Cash_Management_Branch/reviewer/reviewer-cash-management-pending/reviewer-cash-management-pending.component';
import { RevieweredCashManagementComponent } from './branch_audit/Cash_Management_Branch/reviewer/reviewered-cash-management/reviewered-cash-management.component';

import { ControllableExpensePassedComponent } from './branch_audit/Controllable_Expense/auditor/controllable-expense-passed/controllable-expense-passed.component';
import { ControllableExpensePendingComponent } from './branch_audit/Controllable_Expense/auditor/controllable-expense-pending/controllable-expense-pending.component';
import { CompiledAuditsDraftingApproverBranchComponent } from './branch_audit/approver/compiled-audits-drafting-approver-branch/compiled-audits-drafting-approver-branch.component';
import { CompiledAtmCardDivisionComponent } from './branch_audit/division_compiler/compiled-atm-card-division/compiled-atm-card-division.component';
import { CompiledAtmCardReviewedDivisionComponent } from './branch_audit/division_compiler/compiled-atm-card-division/compiled-atm-card-reviewed-division/compiled-atm-card-reviewed-division.component';
import { OperationalDescripancyPendingRegionalComponent } from './branch_audit/operational-descripancy/regional_compiler/operational-descripancy-pending-regional/operational-descripancy-pending-regional.component';

import { GeneralObservationPassedBranchComponent } from './branch_audit/general_observation_and_comment/Auditor/general-observation-passed-branch/general-observation-passed-branch/general-observation-passed-branch.component';
import { OperationalDescripancyReviewedRegionalComponent } from './branch_audit/operational-descripancy/regional_compiler/operational-descripancy-reviewed-regional/operational-descripancy-reviewed-regional.component';

import { ControllableExpenseTypeComponent } from './branch_audit/Controllable_Expense/auditor/controllable-expense-type/controllable-expense-type.component';
import { ControllableReviewerPendingComponent } from './branch_audit/Controllable_Expense/reviewer/controllable-reviewer-pending/controllable-reviewer-pending.component';
import { ControllableReviewerReviewedComponent } from './branch_audit/Controllable_Expense/reviewer/controllable-reviewer-reviewed/controllable-reviewer-reviewed.component';
import { CashcountpendingComponent } from './branch_audit/cash_count/reviewer/cashcountpending/cashcountpending.component';
import { CashcountreviewedComponent } from './branch_audit/cash_count/reviewer/cashcountreviewed/cashcountreviewed.component';

import { CashcountdivisionreviewedComponent } from './branch_audit/division_compiler/compiled-cash-count-division/cashcountdivisionreviewed/cashcountdivisionreviewed.component';

import { CashManagementPendingBranchManagerComponent } from './branch_audit/Cash_Management_Branch/branch-manager/cash-management-pending-branch-manager/cash-management-pending-branch-manager.component';
import { ControllableExpensePendingBranchManagerComponent } from './branch_audit/Controllable_Expense/branch-manager/controllable-expense-pending-branch-manager/controllable-expense-pending-branch-manager.component';
import { AtmCardReviewerRectificationTrackerComponent } from './branch_audit/atm_card/reviewer/atm-card-reviewer-rectification-tracker/atm-card-reviewer-rectification-tracker.component';
import { CashCountPendingBranchManagerComponent } from './branch_audit/cash_count/branch-manager/cash-count-pending-branch-manager/cash-count-pending-branch-manager.component';
import { CashPerformancePassedComponent } from './branch_audit/cash_performance/auditor/cash-performance-passed/cash-performance-passed.component';
import { CashPerformancePendingBranchManagerComponent } from './branch_audit/cash_performance/branch-manager/cash-performance-pending-branch-manager/cash-performance-pending-branch-manager.component';
import { CompiledAbnormalBalanceDivisionComponent } from './branch_audit/division_compiler/compiled-abnormal-balance-division/compiled-abnormal-balance-division.component';
import { CompiledAbnormalBalanceReviewedDivisioComponent } from './branch_audit/division_compiler/compiled-abnormal-balance-division/compiled-abnormal-balance-reviewed-division/compiled-abnormal-balance-reviewed-divisio.component';
import { CompiledAssetLiabilityDivisionComponent } from './branch_audit/division_compiler/compiled-asset-liability-division/compiled-asset-liability-division.component';
import { CompiledAssetLiabilityReviewedDivisionComponent } from './branch_audit/division_compiler/compiled-asset-liability-division/compiled-asset-liability-reviewed-division/compiled-asset-liability-reviewed-division.component';
import { CompiledCashCountDivisionComponent } from './branch_audit/division_compiler/compiled-cash-count-division/compiled-cash-count-division.component';
import { CompiledCashPerformanceDivisionComponent } from './branch_audit/division_compiler/compiled-cash-performance-division/compiled-cash-performance-division.component';
import { CompiledCashPerformanceReviewedDivisionComponent } from './branch_audit/division_compiler/compiled-cash-performance-division/compiled-cash-performance-reviewed-division/compiled-cash-performance-reviewed-division.component';
import { CompiledDormantInactiveAccountDivisionComponent } from './branch_audit/division_compiler/compiled-dormant-inactive-account-division/compiled-dormant-inactive-account-division.component';
import { CompiledDormantInactiveAccountReviewedDivisionComponent } from './branch_audit/division_compiler/compiled-dormant-inactive-account-division/compiled-dormant-inactive-account-reviewed-division/compiled-dormant-inactive-account-reviewed-division.component';
import { CompiledNegotiableInstrumentDivisionPendingComponent } from './branch_audit/division_compiler/compiled-negotiable-instrument-division/compiled-negotiable-instrument-division-pending/compiled-negotiable-instrument-division-pending.component';
import { CompiledNegotiableInstrumentDivisionReviewedComponent } from './branch_audit/division_compiler/compiled-negotiable-instrument-division/compiled-negotiable-instrument-division-reviewed/compiled-negotiable-instrument-division-reviewed.component';
import { OperationalDiscrepancyPendingDivisionComponent } from './branch_audit/division_compiler/operational-discrepancy/operational-discrepancy-pending-division/operational-discrepancy-pending-division.component';
import { OperationalDiscrepancyReviewedDivisionComponent } from './branch_audit/division_compiler/operational-discrepancy/operational-discrepancy-reviewed-division/operational-discrepancy-reviewed-division.component';
import { DormantInactiveAccountPendingBranchManagerComponent } from './branch_audit/dormant-inactive-account/branch-manager/dormant-inactive-account-pending-branch-manager/dormant-inactive-account-pending-branch-manager.component';
import { GeneralObservationPendingBranchManagerComponent } from './branch_audit/general_observation_and_comment/branch-manager/general-observation-pending-branch-manager/general-observation-pending-branch-manager.component';

import { IncompleteDocumentReviewerRectificationTrackerComponent } from './branch_audit/incomplete-document-account/reviewer/incomplete-document-reviewer-rectification-tracker/incomplete-document-reviewer-rectification-tracker.component';
import { LoanAndAdvancePendingBranchManagerComponent } from './branch_audit/loan_and_advance/branch-manager/loan-and-advance-pending-branch-manager/loan-and-advance-pending-branch-manager.component';
import { DraftedlongoutstandingitemComponent } from './branch_audit/long_outstanding_item/auditor/draftedlongoutstandingitem/draftedlongoutstandingitem.component';
import { PassedlongoutstandingitemComponent } from './branch_audit/long_outstanding_item/auditor/passedlongoutstandingitem/passedlongoutstandingitem.component';

import { CashManagementRectifiedTrackerComponent } from './branch_audit/Cash_Management_Branch/reviewer/cash-management-rectified-tracker/cash-management-rectified-tracker.component';
import { MemorandumReviewerRectificationTrackerComponent } from './branch_audit/MCA/reviewer/memorandum-reviewer-rectification-tracker/memorandum-reviewer-rectification-tracker.component';
import { AbnormalBalanceReviewerRectificationTrackerComponent } from './branch_audit/abnormal-balance/reviewer/abnormal-balance-reviewer-rectification-tracker/abnormal-balance-reviewer-rectification-tracker.component';
import { AssetLiabilityReviewerRectificationTrackerComponent } from './branch_audit/asset-liability/reviewer/asset-liability-reviewer-rectification-tracker/asset-liability-reviewer-rectification-tracker.component';
import { CashPerformanceReviewerRectificationTrackerComponent } from './branch_audit/cash_performance/reviewer/cash-performance-reviewer-rectification-tracker/cash-performance-reviewer-rectification-tracker.component';
import { BranchAuditNotificationHigherRolesComponent } from './branch_audit/common/notification/branch-audit-notification-higher-roles/branch-audit-notification-higher-roles.component';
import { BranchAuditNotificationLowerRolesComponent } from './branch_audit/common/notification/branch-audit-notification-lower-roles/branch-audit-notification-lower-roles.component';
import { RemarkNotificationBranchComponent } from './branch_audit/common/notification/remark-notification-branch/remark-notification-branch.component';
import { CompiledCashManagementDivisionReviewedComponent } from './branch_audit/division_compiler/compiled-cash-management-division/compiled-cash-management-division-reviewed/compiled-cash-management-division-reviewed.component';
import { CompiledCashManagementDivisionComponent } from './branch_audit/division_compiler/compiled-cash-management-division/compiled-cash-management-division.component';
import { CompiledControllableExpenseDivisionReviewedComponent } from './branch_audit/division_compiler/compiled-controllable-expense-division/compiled-controllable-expense-division-reviewed/compiled-controllable-expense-division-reviewed.component';
import { CompiledControllableExpenseDivisionComponent } from './branch_audit/division_compiler/compiled-controllable-expense-division/compiled-controllable-expense-division.component';
import { CompiledGeneralObservationDivisionReviewedComponent } from './branch_audit/division_compiler/compiled-general-observation-division/compiled-general-observation-division-reviewed/compiled-general-observation-division-reviewed.component';
import { CompiledGeneralObservationDivisionComponent } from './branch_audit/division_compiler/compiled-general-observation-division/compiled-general-observation-division.component';
import { CompiledLoanAdvanceDivisionReviewedComponent } from './branch_audit/division_compiler/compiled-loan-advance-division/compiled-loan-advance-division-reviewed/compiled-loan-advance-division-reviewed.component';
import { CompiledLoanAdvanceDivisionComponent } from './branch_audit/division_compiler/compiled-loan-advance-division/compiled-loan-advance-division.component';
import { CompiledLongOutstandingDivisionReviewedComponent } from './branch_audit/division_compiler/compiled-long-outstanding-division/compiled-long-outstanding-division-reviewed/compiled-long-outstanding-division-reviewed.component';
import { CompiledLongOutstandingDivisionComponent } from './branch_audit/division_compiler/compiled-long-outstanding-division/compiled-long-outstanding-division.component';
import { CompiledMemorandumDivisionComponent } from './branch_audit/division_compiler/compiled-memorandum-contigent/compiled-memorandum-division/compiled-memorandum-division.component';
import { CompiledMemorandumReviewedDivisionComponent } from './branch_audit/division_compiler/compiled-memorandum-contigent/compiled-memorandum-reviewed-division/compiled-memorandum-reviewed-division.component';
import { CompiledStatusAuditDivisionReviewedComponent } from './branch_audit/division_compiler/compiled-status-audit-division/compiled-status-audit-division-reviewed/compiled-status-audit-division-reviewed.component';
import { CompiledStatusAuditDivisionComponent } from './branch_audit/division_compiler/compiled-status-audit-division/compiled-status-audit-division.component';
import { CompiledSuspenseAccountDivisionPendingComponent } from './branch_audit/division_compiler/compiled-suspense-account-division/compiled-suspense-account-division-pending/compiled-suspense-account-division-pending.component';
import { CompilerSuspenseAccountDivisionCompiledComponent } from './branch_audit/division_compiler/compiled-suspense-account-division/compiler-suspense-account-division-compiled/compiler-suspense-account-division-compiled.component';
import { LongOutstandingItemBranchManagerComponent } from './branch_audit/long_outstanding_item/branch-manager/long-outstanding-item-branch-manager/long-outstanding-item-branch-manager.component';
import { PendinglongoutstandingitemsComponent } from './branch_audit/long_outstanding_item/reviewer/pendinglongoutstandingitems/pendinglongoutstandingitems.component';
import { ReviewedlongoutstandingitemsComponent } from './branch_audit/long_outstanding_item/reviewer/reviewedlongoutstandingitems/reviewedlongoutstandingitems.component';
import { NegotiableInstrumentPendingBranchManagerComponent } from './branch_audit/negotiable_instrument/branch-manager/negotiable-instrument-pending-branch-manager/negotiable-instrument-pending-branch-manager.component';
import { NegotiableInstrumentRectificationTrackerComponent } from './branch_audit/negotiable_instrument/reviewer/negotiable-instrument-rectification-tracker/negotiable-instrument-rectification-tracker.component';
import { PendingNegotiableInstrumentReviewerComponent } from './branch_audit/negotiable_instrument/reviewer/pending-negotiable-instrument-reviewer/pending-negotiable-instrument-reviewer.component';
import { ReviewedNegotiableInstrumentReviewerComponent } from './branch_audit/negotiable_instrument/reviewer/reviewed-negotiable-instrument-reviewer/reviewed-negotiable-instrument-reviewer.component';
import { DataPoolingBranchComponent } from './branch_audit/operational-descripancy/data-pooling-branch/data-pooling-branch.component';
import { OperationalDescripancyReviewerRectificationTrackerComponent } from './branch_audit/operational-descripancy/regional_compiler/operational-descripancy-reviewer-rectification-tracker/operational-descripancy-reviewer-rectification-tracker.component';
import { CashCountComponent } from './branch_audit/report/general/cash-count/cash-count.component';
import { GeneralObservationCommentComponent } from './branch_audit/report/general/general-observation-comment/general-observation-comment.component';
import { LoanAndAdvanceComponent } from './branch_audit/report/general/loan-and-advance/loan-and-advance.component';
import { LongOutstandinItemComponent } from './branch_audit/report/general/long-outstandin-item/long-outstandin-item.component';
import { MemorandumContigentComponent } from './branch_audit/report/general/memorandum-contigent/memorandum-contigent.component';
import { NegotiableInstrumentComponent } from './branch_audit/report/general/negotiable-instrument/negotiable-instrument.component';
import { ReportAbnormalBalanceComponent } from './branch_audit/report/general/report-abnormal-balance/report-abnormal-balance.component';
import { ReportAccountIncompleteDocumentComponent } from './branch_audit/report/general/report-account-incomplete-document/report-account-incomplete-document.component';
import { ReportAssetLiabilitiesComponent } from './branch_audit/report/general/report-asset-liabilities/report-asset-liabilities.component';
import { ReportCashExcessOrShortageComponent } from './branch_audit/report/general/report-cash-excess-or-shortage/report-cash-excess-or-shortage.component';
import { ReportCashManagementComponent } from './branch_audit/report/general/report-cash-management/report-cash-management.component';
import { ReportControllableExpenseComponent } from './branch_audit/report/general/report-controllable-expense/report-controllable-expense.component';
import { ReportDormantInactiveAccountComponent } from './branch_audit/report/general/report-dormant-inactive-account/report-dormant-inactive-account.component';
import { ReportOperationalDescripencyComponent } from './branch_audit/report/general/report-operational-descripency/report-operational-descripency.component';
import { ReportStatusOfAuditComponent } from './branch_audit/report/general/report-status-of-audit/report-status-of-audit.component';
import { ReportGeneralComponent } from './branch_audit/report/report-general/report-general.component';
import { StatusofauditpendingbmComponent } from './branch_audit/statusofaudit/branch_manager/statusofauditpendingbm/statusofauditpendingbm.component';
import { StatusOfAuditReviewerRectificationTrackerComponent } from './branch_audit/statusofaudit/reviewer/status-of-audit-reviewer-rectification-tracker/status-of-audit-reviewer-rectification-tracker.component';
import { SuspenseAccountDraftingBranchComponent } from './branch_audit/suspense_account/auditor/suspense-account-drafting-branch/suspense-account-drafting-branch.component';
import { SuspenseAccountPassedBranchComponent } from './branch_audit/suspense_account/auditor/suspense-account-passed-branch/suspense-account-passed-branch.component';
import { SuspenseAccountTypeManagementComponent } from './branch_audit/suspense_account/auditor/suspense-account-type-management/suspense-account-type-management.component';
import { SuspenseAccountPendingBranchManagerComponent } from './branch_audit/suspense_account/branch-manager/suspense-account-pending-branch-manager/suspense-account-pending-branch-manager.component';
import { PendingSuspenseAccountReviewerComponent } from './branch_audit/suspense_account/reviewer/pending-suspense-account-reviewer/pending-suspense-account-reviewer.component';
import { ReviewedSuspenseAccountReviewerComponent } from './branch_audit/suspense_account/reviewer/reviewed-suspense-account-reviewer/reviewed-suspense-account-reviewer.component';

const routes: Routes = [
  { path: '', component: DashboardContainerComponent },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'user-profile', component: UsersProfileComponent },

  { path: 'signup', component: SignupComponent },

  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'update-password', component: UpdatePasswordComponent },

  {
    path: 'recommendation',
    component: RecommendationComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_AUDITEE',
        'ROLE_REVIEWER_BFA',
        'ROLE_AUDITEE_DIVISION',
        'ROLE_FOLLOWUP_OFFICER',
        'ROLE_COMPILER_BFA',
      ],
    },
  },

  {
    path: 'Manage-recommendation',
    component: ManageRecommendationComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_AUDITEE',
        'ROLE_REVIEWER_BFA',
        'ROLE_AUDITEE_DIVISION',
        'ROLE_FOLLOWUP_OFFICER',
        'ROLE_COMPILER_BFA',
      ],
    },
  },

  {
    path: 'need-help',
    component: NeedHelpComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_AUDITEE',
        'ROLE_REVIEWER_BFA',
        'ROLE_AUDITEE_DIVISION',
        'ROLE_FOLLOWUP_OFFICER',
      ],
    },
  },

  {
    path: 'cash-management-drafting-branch',
    component: AuditorCashManagementPendingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'cash-managemenet-passed-branch',
    component: AuditorCashManagementPassedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },
  {
    path: 'operational-descripancy-pending',
    component: OperationalDescripancyBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },
  {
    path: 'abnormalbalance_branch_manager_pending',
    component: AbnormalBalancePendingBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },
  {
    path: 'status_of_audit_branch_manager_pending',
    component: StatusofauditpendingbmComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },
  {
    path: 'asset_liability_branch_manager_pending',
    component: AssetLiabilityPendingBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },

  {
    path: 'incomplete-account-drafting-branch',
    component: IncompleteAccountDraftingBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'controllable_expense_type',
    component: ControllableExpenseTypeComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'controllable-expense-reviewer-pending',
    component: ControllableReviewerPendingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'controllable-expense-reviewer-reviewed',
    component: ControllableReviewerReviewedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'controllable_expense_pending',
    component: ControllableExpensePendingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'controllable_expense_passed',
    component: ControllableExpensePassedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'general-observation-draft-branch',
    component: GeneralObservationDraftingBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },
  {
    path: 'general-observation-passed-branch',
    component: GeneralObservationPassedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },
  {
    path: 'general-observation-pending-branch',
    component: GeneralObservationPendingBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'general-observation-reviewed-branch',
    component: GeneralObservationReviewedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'loan-and-advance-drafted-branch',
    component: LoanAndAdvanceDraftedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'loan-and-advance-passed-branch',
    component: LoanAndAdvancePassedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'loan-and-advance-pending-branch',
    component: LoanAndAdvancePendingBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },
  {
    path: 'loan-and-advance-reviewed-branch',
    component: LoanAndAdvanceReviewedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'cash-management-pending-branch',
    component: ReviewerCashManagementPendingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'cash-management-passed',
    component: RevieweredCashManagementComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'dormant-drafting-branch',
    component: DormantInactiveAccountDraftingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'dormant-passed-branch',
    component: DormantInactiveAccountPassedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'statusofaudit_drafting',
    component: StatusofauditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'statusofaudit_passed',
    component: PassedStatusOfAuditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'statusofaudit_pending_reviewer',
    component: StatusofauditreviewComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'statusofaudit_reviewed_reviewer',
    component: StatusofauditunreviewComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'cash-count-draft',
    component: CashcountdraftComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'cash-count-passed',
    component: CashcountpassedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'cash_count_pending_reviewer',
    component: CashcountpendingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'cash_count_reviewed_reviewer',
    component: CashcountreviewedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'long_outstanding_items_draft',
    component: DraftedlongoutstandingitemComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'long_outstanding_items_passed',
    component: PassedlongoutstandingitemComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'long_outstanding_items_pending',
    component: PendinglongoutstandingitemsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'long_outstanding_items_reviewed',
    component: ReviewedlongoutstandingitemsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'incomplete-account-pending-branch',
    component: IncompleteAccountPendingForReviewBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'app-incomplete-document-reviewer-rectification-tracker',
    component: IncompleteDocumentReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'app-operational-descripancy-reviewer-rectification-tracker',
    component: OperationalDescripancyReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'app-cash-count-reviewer-rectification-tracker',
    component: CashCountReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'app-data-pooling-branch',
    component: DataPoolingBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA', 'ROLE_COMPILER_BFA', 'ROLE_AUDITOR_BFA'],
    },
  },
  {
    path: 'app-negotiable-instrument-rectification-tracker',
    component: NegotiableInstrumentRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },
  {
    path: 'app-atm-card-reviewer-rectification-tracker',
    component: AtmCardReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'app-controllable-expense-reviewer-rectification-tracker',
    component: ControllableExpenseReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'app-general-observation-reviewer-rectification-tracker',
    component: GeneralObservationReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'app-suspense-account-reviewer-rectification-tracker',
    component: SuspenseAccountReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'app-loan-and-advance-reviewer-rectification-tracker',
    component: LoanAndAdvanceReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'app-long-outstanding-reviewer-rectification-tracker',
    component: LongOutstandingReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'app-dormant-inactive-reviewer-rectification-tracker',
    component: DormantInactiveReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'asset-liability-reviewer-rectification-tracker',
    component: AssetLiabilityReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'abnormal-balance-reviewer-rectification-tracker',
    component: AbnormalBalanceReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'memorandum-reviewer-rectification-tracker',
    component: MemorandumReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'cash-performance-reviewer-rectification-tracker',
    component: CashPerformanceReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'cash-management-reviewer-rectification-tracker',
    component: CashManagementRectifiedTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'status-of-audit-reviewer-rectification-tracker',
    component: StatusOfAuditReviewerRectificationTrackerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REGIONALD_BFA',
        'ROLE_BRANCHM_BFA',
      ],
    },
  },

  {
    path: 'app-compiled-negotiable-instrument-division-reviewed',
    component: CompiledNegotiableInstrumentDivisionReviewedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-compiled-negotiable-instrument-division-pending',
    component: CompiledNegotiableInstrumentDivisionPendingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-compiled-abnormal-balance-reviewed-divisio',
    component: CompiledAbnormalBalanceReviewedDivisioComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'contigent',
    component: ReviewerMemorandumDraftingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'contigent-reviewed',
    component: ReviewerMemorandumPassedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'dormant-pending',
    component: DormantInactiveAccountPendingForReviewBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'dormant-reviewed',
    component: DormantInactiveAccountReviewedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'incomplete-account-reviewed-branch',
    component: IncompleteAccountReviewedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },
  {
    path: 'regional-compiled-audits-progress',
    component: RegionalCompiledAuditsProgressComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA', 'ROLE_REGIONALD_BFA'],
    },
  },

  {
    path: 'app-regional-compiled-findings-pending',
    component: RegionalCompiledFindingsPendingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'incomplete-account-on-progress-reviewer-branch',
    component: IncompleteAccountOnProgressForReviewerBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'incomplete-account-on-progress-branch',
    component: IncompleteAccountOnProgressBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'incomplete-account-passed-branch',
    component: IncompleteAccountPassedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'incomplete-account-reviewed-division-branch',
    component: CompiledIncompleteDocumentReviewedDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-compiled-abnormal-balance-division',
    component: CompiledAbnormalBalanceDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-compiled-asset-liability-division',
    component: CompiledAssetLiabilityDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-compiled-cash-count-division',
    component: CompiledCashCountDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-compiled-cash-performance-division',
    component: CompiledCashPerformanceDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-compiled-dormant-inactive-division',
    component: CompiledDormantInactiveAccountDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'compiled-audits-division',
    component: CompiledAuditsDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'cash-count-reviewed-division-branch',
    component: CashcountdivisionreviewedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-compiled-cash-performance-reviewed-division',
    component: CompiledCashPerformanceReviewedDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-compiled-dormant-inactive-account-reviewed-division',
    component: CompiledDormantInactiveAccountReviewedDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-compiled-asset-liability-reviewed-division',
    component: CompiledAssetLiabilityReviewedDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'compiled-atm-card-reviewed-division-branch',
    component: CompiledAtmCardReviewedDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'compiled-atm-card-division-branch',
    component: CompiledAtmCardDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-compiled-suspense-account-division-pending',
    component: CompiledSuspenseAccountDivisionPendingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-compiled-suspense-account-division-reviewed',
    component: CompilerSuspenseAccountDivisionCompiledComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-compiled-memorandum-contigent-division-pending',
    component: CompiledMemorandumDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-compiled-memorandum-contigent-division-reviewed',
    component: CompiledMemorandumReviewedDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },
  {
    path: 'compiled-audits-progress-division',
    component: CompiledAuditsProgressDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-operational-discrepancy-pending-division',
    component: OperationalDiscrepancyPendingDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-operational-discrepancy-reviewed-division',
    component: OperationalDiscrepancyReviewedDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'incomplete-account-pending-division-branch',
    component: CompiledIncompleteDocumentAccountDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'abnormal-balance-pending-reviewer',
    component: AbnormalBalancePendingForReviewerBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },
  {
    path: 'abnormal-balance-reviewed-reviewer',
    component: AbnormalBalanceReviewedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },
  {
    path: 'asset-liability-pending-reviewer',
    component: AssetLiabilityPendingForReviewBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },
  {
    path: 'asset-liability_reviewed-reviewer',
    component: AssetLiabilityReviewedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'abnormal-balance-drafting',
    component: AbnormalBalanceDraftingBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'abnormal-balance-passed',
    component: AbnormalBalancePassedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'asset-liability-drafting',
    component: AssetLiabilityDraftingBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'asset-liability-passed',
    component: AssetLiabilityPassedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'operational_descripancy_drafted',
    component: OperatioalDescripancyDraftingAuditorBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },
  {
    path: 'operational_descripancy_passed',
    component: OperatioalDescripancyPassedAuditorBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'operational_descripancy_category',
    component: OperationalDescripancyCategoryComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'operational-discrepancy-pending-region',
    component: OperationalDescripancyPendingRegionalComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'operational-discrepancy-reviewed-region',
    component: OperationalDescripancyReviewedRegionalComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'memorandum-contigent-drafting-branch',
    component: AuditorMemorandumDraftingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'memorandum-contigent-passed-branch',
    component: MemorandumPassedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'atm-card-passed-finding',
    component: AtmCardPassedFindingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'atm-card-pending-reviewer',
    component: AtmCardPendingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'atm-card-reviewed-reviewer',
    component: AtmCardReviewedReviewerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'atm-card-drafting',
    component: AtmCardDraftingFindingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'cash-on-drafting-branch',
    component: CashPerformanceDraftingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'cash-on-passed-branch',
    component: CashPerformancePassedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },
  {
    path: 'cash-performance-pending-reviewer-branch',
    component: ReviewerCashPerformancePendingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'negotiable_instrument_pending_for_review',
    component: PendingNegotiableInstrumentReviewerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'negotiable_instrument_reviewed',
    component: ReviewedNegotiableInstrumentReviewerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },
  {
    path: 'cash-performance-reviewed-reviewer-branch',
    component: ReviewerCashPerformanceReviewedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'manage-common-finding',
    component: ManageCommonFindingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA', 'ROLE_APPROVER_BFA', 'ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'common-finding',
    component: CommonFindingComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA', 'ROLE_APPROVER_BFA', 'ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'atm-card-branch-manager-pending',
    component: AtmCardPendingBranchMangerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },

  {
    path: 'incomplete-account-branch-manager-pending',
    component: IncompleteDocumentPendingBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },

  {
    path: 'compiled-pending-approver-branch',
    component: CompiledPendingAuditsBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_APPROVER_BFA'],
    },
  },

  {
    path: 'compiled-approved-approver-branch',
    component: CompiledApprovedAuditsBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_APPROVER_BFA'],
    },
  },

  {
    path: 'compiled-audits-drafting-approver-branch',
    component: CompiledAuditsDraftingApproverBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_APPROVER_BFA'],
    },
  },

  {
    path: 'negotiable_instrument_drafted',
    component: NegotiableInstrumentDraftingBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'negotiable_instrument_passed',
    component: NegotiableInstrumentPassedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'negotiable_stock_item',
    component: NegotiableStockItemManagementComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'suspense_account_drafted',
    component: SuspenseAccountDraftingBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },

  {
    path: 'suspense_account_passed',
    component: SuspenseAccountPassedBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_AUDITOR_BFA'],
    },
  },
  {
    path: 'suspense_account_type',
    component: SuspenseAccountTypeManagementComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },
  {
    path: 'suspense_account_pending_for_review',
    component: PendingSuspenseAccountReviewerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },
  {
    path: 'suspense_account_reviewed',
    component: ReviewedSuspenseAccountReviewerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA'],
    },
  },

  {
    path: 'cash_management_branch_manager_pending',
    component: CashManagementPendingBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },

  {
    path: 'cash_count_branch_manager_pending',
    component: CashCountPendingBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },

  {
    path: 'cash_performance_branch_manager_pending',
    component: CashPerformancePendingBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },

  {
    path: 'controllable_expense_branch_manager_pending',
    component: ControllableExpensePendingBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },

  {
    path: 'dormant_inactive_branch_manager_pending',
    component: DormantInactiveAccountPendingBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },

  {
    path: 'loan_and_advance_branch_manager_pending',
    component: LoanAndAdvancePendingBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },

  {
    path: 'negotiable_instrument_branch_manager_pending',
    component: NegotiableInstrumentPendingBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },

  {
    path: 'long_outstanding_item_branch_manager_pending',
    component: LongOutstandingItemBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },
  {
    path: 'memorandom_contingent_branch_manager_pending',
    component: MemorandomContingentReportedBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },

  {
    path: 'suspense_account_branch_manager_pending',
    component: SuspenseAccountPendingBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },

  {
    path: 'general_observation_branch_manager_pending',
    component: GeneralObservationPendingBranchManagerComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_BRANCHM_BFA'],
    },
  },

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\report
  {
    path: 'report-atm-card',
    component: ReportGeneralComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },
  {
    path: 'report-abnormal-balance',
    component: ReportAbnormalBalanceComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },
  {
    path: 'report-account-incomplete-document',
    component: ReportAccountIncompleteDocumentComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },
  {
    path: 'report-asset-liabilities',
    component: ReportAssetLiabilitiesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },
  {
    path: 'report-controllable-expense',
    component: ReportControllableExpenseComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },
  {
    path: 'report-dormant-inactive-account',
    component: ReportDormantInactiveAccountComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },
  {
    path: 'report-cash-excess-shortage',
    component: ReportCashExcessOrShortageComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },
  {
    path: 'report-cash-management',
    component: ReportCashManagementComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },

  {
    path: 'report-suspense-account',
    component: ReportSuspenseAccountComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },
  {
    path: 'report-status-of-audit',
    component: ReportStatusOfAuditComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },

  {
    path: 'operational',
    component: ReportOperationalDescripencyComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },
  {
    path: 'generalobservation',
    component: GeneralObservationCommentComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },
  {
    path: 'memorandumcontingent',
    component: MemorandumContigentComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },
  {
    path: 'negotiableinstrument',
    component: NegotiableInstrumentComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },
  {
    path: 'longoutstandingitem',
    component: LongOutstandinItemComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },
  {
    path: 'loanadvance',
    component: LoanAndAdvanceComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },

  {
    path: 'cashcount',
    component: CashCountComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_AUDITOR_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_COMPILER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },

  {
    path: 'compiled-loan-advance-division-reviewed',
    component: CompiledLoanAdvanceDivisionReviewedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'compiled-loan-advance-division-pending',
    component: CompiledLoanAdvanceDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'compiled-long-outstanding-division-pending',
    component: CompiledLongOutstandingDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },
  {
    path: 'compiled-long-outstanding-division-reviewed',
    component: CompiledLongOutstandingDivisionReviewedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },
  {
    path: 'compiled-general-observation-division-pending',
    component: CompiledGeneralObservationDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },
  {
    path: 'compiled-general-observation-division-reviewed',
    component: CompiledGeneralObservationDivisionReviewedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },
  {
    path: 'compiled-cash-management-division-pending',
    component: CompiledCashManagementDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },
  {
    path: 'compiled-cash-management-division-reviewed',
    component: CompiledCashManagementDivisionReviewedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },
  {
    path: 'compiled-status-audit-division-pending',
    component: CompiledStatusAuditDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },
  {
    path: 'compiled-status-audit-division-reviewed',
    component: CompiledStatusAuditDivisionReviewedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'compiled-controllable-expense-division-pending',
    component: CompiledControllableExpenseDivisionComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'compiled-controllable-expense-division-reviewed',
    component: CompiledControllableExpenseDivisionReviewedComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA'],
    },
  },

  {
    path: 'app-branch-audit-notification-lower-roles',
    component: BranchAuditNotificationLowerRolesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_REVIEWER_BFA', 'ROLE_BRANCHM_BFA', 'ROLE_REGIONALD_BFA'],
    },
  },

  {
    path: 'app-branch-audit-notification-higher-roles',
    component: BranchAuditNotificationHigherRolesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_COMPILER_BFA', 'ROLE_APPROVER_BFA'],
    },
  },

  {
    path: 'app-remark-notification-branch',
    component: RemarkNotificationBranchComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        'ROLE_COMPILER_BFA',
        'ROLE_APPROVER_BFA',
        'ROLE_REVIEWER_BFA',
        'ROLE_BRANCHM_BFA',
        'ROLE_AUDITOR_BFA',
        'ROLE_REGIONALD_BFA',
      ],
    },
  },

  { path: 'invalid-token', component: InvalidTokenComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

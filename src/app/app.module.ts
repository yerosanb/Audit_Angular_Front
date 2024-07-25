//Basic Modules
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngb-modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { TimeagoModule } from 'ngx-timeago';
import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StepsModule } from 'primeng/steps';
import { TagModule } from 'primeng/tag';

//JQX widgets
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import { AppComponent } from './app.component';

//Layouts
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

//pages
import { MultiSelectModule } from 'primeng/multiselect';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';

//reports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DarkModeToggleComponent } from './pages/dark-mode-toggle/dark-mode-toggle.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { InvalidTokenComponent } from './pages/invalid-token/invalid-token.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';

import { NeedHelpComponent } from './components/common/contacts/need-help/need-help.component';
import { AdminSkeletonFiveComponent } from './components/skeleton/admin-skeleton/admin-skeleton-five/admin-skeleton-five.component';
import { AdminSkeletonFourComponent } from './components/skeleton/admin-skeleton/admin-skeleton-four/admin-skeleton-four.component';
import { AdminSkeletonOneComponent } from './components/skeleton/admin-skeleton/admin-skeleton-one/admin-skeleton-one.component';
import { AdminSkeletonSevenComponent } from './components/skeleton/admin-skeleton/admin-skeleton-seven/admin-skeleton-seven.component';
import { AdminSkeletonSixComponent } from './components/skeleton/admin-skeleton/admin-skeleton-six/admin-skeleton-six.component';
import { AdminSkeletonThreeComponent } from './components/skeleton/admin-skeleton/admin-skeleton-three/admin-skeleton-three.component';
import { AdminSkeletonTwoComponent } from './components/skeleton/admin-skeleton/admin-skeleton-two/admin-skeleton-two.component';
import { ApproverSkeletonOneComponent } from './components/skeleton/approver-skeleton/approver-skeleton-one/approver-skeleton-one.component';
import { HoSkeletonComponent } from './components/skeleton/ho-skeleton/ho-skeleton/ho-skeleton.component';
import { MakerSkeletonOneComponent } from './components/skeleton/maker-skeleton/maker-skeleton-one/maker-skeleton-one.component';
import { MakerSkeletonTwoComponent } from './components/skeleton/maker-skeleton/maker-skeleton-two/maker-skeleton-two.component';
import { RecentActivitySkeletonComponent } from './components/skeleton/recent-activity-skeleton/recent-activity-skeleton.component';
import { FcyGeneratedComponent } from './components/skeleton/shared-skeleton/fcy-generated/fcy-generated.component';
import { LoanAllowedAmountSkeletonComponent } from './components/skeleton/shared-skeleton/loan-allowed-amount-skeleton/loan-allowed-amount-skeleton.component';
import { MakerApproverOneComponent } from './components/skeleton/shared-skeleton/maker-approver-one/maker-approver-one.component';
import { MakerApproverSkeletonComponent } from './components/skeleton/shared-skeleton/maker-approver-skeleton/maker-approver-skeleton.component';
import { MakerApproverThreeComponent } from './components/skeleton/shared-skeleton/maker-approver-three/maker-approver-three.component';
import { MakerApproverTwoComponent } from './components/skeleton/shared-skeleton/maker-approver-two/maker-approver-two.component';
import { RadSkeletonComponent } from './components/skeleton/shared-skeleton/rad-skeleton/rad-skeleton.component';
import { DashboardContainerComponent } from './pages/dashboard/dashboard-container/dashboard-container.component';
import { SignupComponent } from './pages/signup/signup.component';

import { SelectButtonModule } from 'primeng/selectbutton';

import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule as PrimeNGEditor } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { PasswordModule } from 'primeng/password';
import { KnobModule } from 'primeng/knob';


//editor
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

import { ChartModule } from 'primeng/chart';
import { ChipsModule } from 'primeng/chips';
import { ListboxModule } from 'primeng/listbox';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonFindingComponent } from './components/common/common-finding/common-finding.component';
import { ManageCommonFindingComponent } from './components/common/manage-common-finding/manage-common-finding.component';
import { ManageRecommendationComponent } from './components/common/manage-recommendation/manage-recommendation.component';
import { RecommendationComponent } from './components/common/recommendation/recommendation.component';

import { AbnormalBalanceDraftingBranchComponent } from './branch_audit/abnormal-balance/auditor/abnormal-balance-drafting-branch/abnormal-balance-drafting-branch.component';
import { AbnormalBalancePassedBranchComponent } from './branch_audit/abnormal-balance/auditor/abnormal-balance-passed-branch/abnormal-balance-passed-branch.component';
import { AbnormalBalancePendingForReviewerBranchComponent } from './branch_audit/abnormal-balance/reviewer/abnormal-balance-pending-for-reviewer-branch/abnormal-balance-pending-for-reviewer-branch.component';
import { AbnormalBalanceReviewedBranchComponent } from './branch_audit/abnormal-balance/reviewer/abnormal-balance-reviewed-branch/abnormal-balance-reviewed-branch.component';
import { AssetLiabilityDraftingBranchComponent } from './branch_audit/asset-liability/auditor/asset-liability-drafting-branch/asset-liability-drafting-branch.component';
import { AssetLiabilityPassedBranchComponent } from './branch_audit/asset-liability/auditor/asset-liability-passed-branch/asset-liability-passed-branch.component';
import { AssetLiabilityPendingForReviewBranchComponent } from './branch_audit/asset-liability/reviewer/asset-liability-pending-for-review-branch/asset-liability-pending-for-review-branch.component';
import { AssetLiabilityReviewedBranchComponent } from './branch_audit/asset-liability/reviewer/asset-liability-reviewed-branch/asset-liability-reviewed-branch.component';
import { AtmCardPassedFindingComponent } from './branch_audit/atm_card/auditor/atm-card-passed-finding/atm-card-passed-finding.component';
import { CashPerformanceDraftingComponent } from './branch_audit/cash_performance/auditor/cash-performance-drafting/cash-performance-drafting.component';
import { CashPerformancePassedComponent } from './branch_audit/cash_performance/auditor/cash-performance-passed/cash-performance-passed.component';
import { AdminComponent } from './layouts/sidebar/admin/admin.component';
import { BranchAuditComponent } from './layouts/sidebar/branch-audit/branch-audit.component';

import { AuditorMemorandumDraftingComponent } from './branch_audit/MCA/auditor/auditor-memorandum-drafting/auditor-memorandum-drafting.component';
import { AbnormalBalancePendingBranchManagerComponent } from './branch_audit/abnormal-balance/branch_manager/abnormal-balance-pending-branch-manager/abnormal-balance-pending-branch-manager.component';
import { AssetLiabilityPendingBranchManagerComponent } from './branch_audit/asset-liability/branch_manager/asset-liability-pending-branch-manager/asset-liability-pending-branch-manager.component';
import { AtmCardDraftingFindingComponent } from './branch_audit/atm_card/auditor/atm-card-drafting-finding/atm-card-drafting-finding.component';
import { AtmCardPendingComponent } from './branch_audit/atm_card/reviewer/atm-card-pending/atm-card-pending.component';
import { AtmCardReviewedReviewerComponent } from './branch_audit/atm_card/reviewer/atm-card-reviewed-reviewer/atm-card-reviewed-reviewer.component';
import { BranchManagerResponseComponent } from './branch_audit/common/branch-manager-response/branch-manager-response/branch-manager-response.component';
import { FileUploadComponent } from './branch_audit/common/file-upload/file-upload.component';
import { RemarkBranchAuditComponent } from './branch_audit/common/remark-branch-audit/remark-branch-audit.component';
import { DormantInactiveAccountPassedBranchComponent } from './branch_audit/dormant-inactive-account/auditor/dormant-inactive-account-passed-branch/dormant-inactive-account-passed-branch.component';
import { DormantInactiveAccountPendingForReviewBranchComponent } from './branch_audit/dormant-inactive-account/reviewer/dormant-inactive-account-pending-for-review-branch/dormant-inactive-account-pending-for-review-branch.component';
import { DormantInactiveAccountReviewedBranchComponent } from './branch_audit/dormant-inactive-account/reviewer/dormant-inactive-account-reviewed-branch/dormant-inactive-account-reviewed-branch.component';
import { IncompleteAccountDraftingBranchComponent } from './branch_audit/incomplete-document-account/auditor/incomplete-account-drafting-branch/incomplete-account-drafting-branch.component';
import { IncompleteAccountOnProgressBranchComponent } from './branch_audit/incomplete-document-account/auditor/incomplete-account-on-progress-branch/incomplete-account-on-progress-branch.component';
import { IncompleteAccountPassedBranchComponent } from './branch_audit/incomplete-document-account/auditor/incomplete-account-passed-branch/incomplete-account-passed-branch.component';
import { IncompleteAccountOnProgressForReviewerBranchComponent } from './branch_audit/incomplete-document-account/reviewer/incomplete-account-on-progress-for-reviewer-branch/incomplete-account-on-progress-for-reviewer-branch.component';
import { IncompleteAccountPendingForReviewBranchComponent } from './branch_audit/incomplete-document-account/reviewer/incomplete-account-pending-for-review-branch/incomplete-account-pending-for-review-branch.component';
import { IncompleteAccountReviewedBranchComponent } from './branch_audit/incomplete-document-account/reviewer/incomplete-account-reviewed-branch/incomplete-account-reviewed-branch.component';
import { OperatioalDescripancyDraftingAuditorBranchComponent } from './branch_audit/operational-descripancy/auditor/operatioal-descripancy-drafting-auditor-branch/operatioal-descripancy-drafting-auditor-branch.component';
import { OperatioalDescripancyPassedAuditorBranchComponent } from './branch_audit/operational-descripancy/auditor/operatioal-descripancy-passed-auditor-branch/operatioal-descripancy-passed-auditor-branch.component';
import { OperationalDescripancyCategoryComponent } from './branch_audit/operational-descripancy/auditor/operational-descripancy-category/operational-descripancy-category.component';
import { OperationalDescripancyBranchManagerComponent } from './branch_audit/operational-descripancy/branch_manager/operational-descripancy-branch-manager/operational-descripancy-branch-manager.component';

import { GeneralObservationDraftingBranchComponent } from './branch_audit/general_observation_and_comment/Auditor/general-observation-drafting-branch/general-observation-drafting-branch.component';
import { GeneralObservationPassedBranchComponent } from './branch_audit/general_observation_and_comment/Auditor/general-observation-passed-branch/general-observation-passed-branch/general-observation-passed-branch.component';

import { ReviewerCashPerformancePendingComponent } from './branch_audit/cash_performance/reviewer/reviewer-cash-performance-pending-reviewer/reviewer-cash-performance-pending.component';
import { ReviewerCashPerformanceReviewedComponent } from './branch_audit/cash_performance/reviewer/reviewer-cash-performance-reviewed/reviewer-cash-performance-reviewed.component';
import { CompileBranchAuditsComponent } from './branch_audit/common/compile-branch-audits/compile-branch-audits.component';
import { DormantInactiveAccountDraftingComponent } from './branch_audit/dormant-inactive-account/auditor/dormant-inactive-account-drafting/dormant-inactive-account-drafting.component';
import { BranchAuditHeaderComponent } from './layouts/header/branch-audit-header/branch-audit-header.component';

import { AuditorCashManagementPassedComponent } from './branch_audit/Cash_Management_Branch/auditor/auditor-cash-management-passed/auditor-cash-management-passed.component';
import { AuditorCashManagementPendingComponent } from './branch_audit/Cash_Management_Branch/auditor/auditor-cash-management-pending/auditor-cash-management-pending.component';
import { MemorandumPassedComponent } from './branch_audit/MCA/auditor/memorandum-passed/memorandum-passed.component';
import { ReviewerMemorandumDraftingComponent } from './branch_audit/MCA/reviewer/reviewer-memorandum-drafting/reviewer-memorandum-drafting.component';
import { ReviewerMemorandumPassedComponent } from './branch_audit/MCA/reviewer/reviewer-memorandum-passed/reviewer-memorandum-passed.component';
import { AtmCardPendingBranchMangerComponent } from './branch_audit/atm_card/branch_manager/atm-card-pending-branch-manger/atm-card-pending-branch-manger.component';
import { CompiledAbnormalBalanceDivisionComponent } from './branch_audit/division_compiler/compiled-abnormal-balance-division/compiled-abnormal-balance-division.component';
import { CompiledAssetLiabilityDivisionComponent } from './branch_audit/division_compiler/compiled-asset-liability-division/compiled-asset-liability-division.component';
import { CompiledAtmCardDivisionComponent } from './branch_audit/division_compiler/compiled-atm-card-division/compiled-atm-card-division.component';
import { CompiledCashPerformanceDivisionComponent } from './branch_audit/division_compiler/compiled-cash-performance-division/compiled-cash-performance-division.component';
import { CompiledDormantInactiveAccountDivisionComponent } from './branch_audit/division_compiler/compiled-dormant-inactive-account-division/compiled-dormant-inactive-account-division.component';
import { CompiledIncompleteDocumentAccountDivisionComponent } from './branch_audit/division_compiler/compiled-incomplete-document-account-division/compiled-incomplete-document-account-division.component';
import { GeneralObservationPendingBranchComponent } from './branch_audit/general_observation_and_comment/reviewer/general-observation-pending-branch/general-observation-pending-branch.component';
import { GeneralObservationReviewedBranchComponent } from './branch_audit/general_observation_and_comment/reviewer/general-observation-reviewed-branch/general-observation-reviewed-branch.component';
import { IncompleteDocumentPendingBranchManagerComponent } from './branch_audit/incomplete-document-account/branch_manager/incomplete-document-pending-branch-manager/incomplete-document-pending-branch-manager.component';

import { CompileCompiledAuditsDivisionComponent } from './branch_audit/common/compile-compiled-audits-division/compile-compiled-audits-division.component';
import { CompiledAuditsDivisionComponent } from './branch_audit/division_compiler/common/compiled-audits-division/compiled-audits-division.component';
import { CompiledAuditsProgressDivisionComponent } from './branch_audit/division_compiler/common/compiled-audits-progress-division/compiled-audits-progress-division.component';
import { CompiledIncompleteDocumentReviewedDivisionComponent } from './branch_audit/division_compiler/compiled-incomplete-document-account-division/compiled-incomplete-document-reviewed-division/compiled-incomplete-document-reviewed-division.component';
import { LoanAndAdvanceDraftedBranchComponent } from './branch_audit/loan_and_advance/Auditor/loan-and-advance-drafted-branch/loan-and-advance-drafted-branch.component';
import { LoanAndAdvancePassedBranchComponent } from './branch_audit/loan_and_advance/Auditor/loan-and-advance-passed-branch/loan-and-advance-passed-branch.component';
import { LoanAndAdvancePendingBranchComponent } from './branch_audit/loan_and_advance/Reviewer/loan-and-advance-pending-branch/loan-and-advance-pending-branch.component';
import { LoanAndAdvanceReviewedBranchComponent } from './branch_audit/loan_and_advance/Reviewer/loan-and-advance-reviewed-branch/loan-and-advance-reviewed-branch.component';

import { CashcountdraftComponent } from './branch_audit/cash_count/auditor/cashcountdraft/cashcountdraft.component';
import { CashcountpassedComponent } from './branch_audit/cash_count/auditor/cashcountpassed/cashcountpassed.component';
import { StatusofauditComponent } from './branch_audit/statusofaudit/statusofaudit.component';

import { ReviewerCashManagementPendingComponent } from './branch_audit/Cash_Management_Branch/reviewer/reviewer-cash-management-pending/reviewer-cash-management-pending.component';
import { RevieweredCashManagementComponent } from './branch_audit/Cash_Management_Branch/reviewer/reviewered-cash-management/reviewered-cash-management.component';
import { CashCountCreatEditBranchComponent } from './branch_audit/cash_count/auditor/cash-count-creat-edit-branch/cash-count-creat-edit-branch.component';

import { NegotiableInstrumentDraftingBranchComponent } from './branch_audit/negotiable_instrument/auditor/negotiable-instrument-drafting-branch/negotiable-instrument-drafting-branch.component';
import { NegotiableInstrumentPassedBranchComponent } from './branch_audit/negotiable_instrument/auditor/negotiable-instrument-passed-branch/negotiable-instrument-passed-branch.component';
import { NegotiableStockItemManagementComponent } from './branch_audit/negotiable_instrument/auditor/negotiable-stock-item-management/negotiable-stock-item-management.component';

import { ControllableExpensePassedComponent } from './branch_audit/Controllable_Expense/auditor/controllable-expense-passed/controllable-expense-passed.component';
import { ControllableExpensePendingComponent } from './branch_audit/Controllable_Expense/auditor/controllable-expense-pending/controllable-expense-pending.component';
import { CompiledAuditsDraftingApproverBranchComponent } from './branch_audit/approver/compiled-audits-drafting-approver-branch/compiled-audits-drafting-approver-branch.component';
import { CompiledAtmCardReviewedDivisionComponent } from './branch_audit/division_compiler/compiled-atm-card-division/compiled-atm-card-reviewed-division/compiled-atm-card-reviewed-division.component';
import { OperationalDescripancyPendingRegionalComponent } from './branch_audit/operational-descripancy/regional_compiler/operational-descripancy-pending-regional/operational-descripancy-pending-regional.component';
import { OperationalDescripancyReviewedRegionalComponent } from './branch_audit/operational-descripancy/regional_compiler/operational-descripancy-reviewed-regional/operational-descripancy-reviewed-regional.component';

import { PassedStatusOfAuditComponent } from './branch_audit/statusofaudit/auditor/passed-status-of-audit/passed-status-of-audit.component';
import { StatusofauditreviewComponent } from './branch_audit/statusofaudit/reviewer/statusofauditreview/statusofauditreview.component';
import { StatusofauditunreviewComponent } from './branch_audit/statusofaudit/reviewer/statusofauditunreview/statusofauditunreview.component';

import { OperationalDiscrepancyPendingDivisionComponent } from './branch_audit/division_compiler/operational-discrepancy/operational-discrepancy-pending-division/operational-discrepancy-pending-division.component';
import { OperationalDiscrepancyReviewedDivisionComponent } from './branch_audit/division_compiler/operational-discrepancy/operational-discrepancy-reviewed-division/operational-discrepancy-reviewed-division.component';

import { ControllableExpenseTypeComponent } from './branch_audit/Controllable_Expense/auditor/controllable-expense-type/controllable-expense-type.component';
import { ControllableReviewerPendingComponent } from './branch_audit/Controllable_Expense/reviewer/controllable-reviewer-pending/controllable-reviewer-pending.component';
import { ControllableReviewerReviewedComponent } from './branch_audit/Controllable_Expense/reviewer/controllable-reviewer-reviewed/controllable-reviewer-reviewed.component';

import { CashcountpendingComponent } from './branch_audit/cash_count/reviewer/cashcountpending/cashcountpending.component';
import { CashcountreviewedComponent } from './branch_audit/cash_count/reviewer/cashcountreviewed/cashcountreviewed.component';

import { CashcountdivisionreviewedComponent } from './branch_audit/division_compiler/compiled-cash-count-division/cashcountdivisionreviewed/cashcountdivisionreviewed.component';

import { CashManagementCreateEditBranchComponent } from './branch_audit/Cash_Management_Branch/auditor/cash-management-create-edit-branch/cash-management-create-edit-branch.component';
import { CashManagementPendingBranchManagerComponent } from './branch_audit/Cash_Management_Branch/branch-manager/cash-management-pending-branch-manager/cash-management-pending-branch-manager.component';
import { ControllableExspenseCreateEditComponent } from './branch_audit/Controllable_Expense/auditor/controllable-exspense-create-edit/controllable-exspense-create-edit.component';
import { ControllableExpensePendingBranchManagerComponent } from './branch_audit/Controllable_Expense/branch-manager/controllable-expense-pending-branch-manager/controllable-expense-pending-branch-manager.component';
import { AbnormalBalanceCreatEditComponent } from './branch_audit/abnormal-balance/auditor/abnormal-balance-creat-edit/abnormal-balance-creat-edit.component';
import { AssetLiabilityCreatEditComponent } from './branch_audit/asset-liability/auditor/asset-liability-creat-edit/asset-liability-creat-edit.component';
import { AtmCardCreateEditComponent } from './branch_audit/atm_card/auditor/atm-card-create-edit/atm-card-create-edit.component';
import { CashCountPendingBranchManagerComponent } from './branch_audit/cash_count/branch-manager/cash-count-pending-branch-manager/cash-count-pending-branch-manager.component';
import { CreateEditCashPerformanceBranchComponent } from './branch_audit/cash_performance/auditor/create-edit-cash-performance-branch/create-edit-cash-performance-branch.component';
import { CashPerformancePendingBranchManagerComponent } from './branch_audit/cash_performance/branch-manager/cash-performance-pending-branch-manager/cash-performance-pending-branch-manager.component';
import { ManageCurrencyComponent } from './branch_audit/common/currency/manage-currency/manage-currency.component';
import { CompiledAbnormalBalanceReviewedDivisioComponent } from './branch_audit/division_compiler/compiled-abnormal-balance-division/compiled-abnormal-balance-reviewed-division/compiled-abnormal-balance-reviewed-divisio.component';
import { CompiledAssetLiabilityReviewedDivisionComponent } from './branch_audit/division_compiler/compiled-asset-liability-division/compiled-asset-liability-reviewed-division/compiled-asset-liability-reviewed-division.component';
import { CompiledCashCountDivisionComponent } from './branch_audit/division_compiler/compiled-cash-count-division/compiled-cash-count-division.component';
import { CompiledCashPerformanceReviewedDivisionComponent } from './branch_audit/division_compiler/compiled-cash-performance-division/compiled-cash-performance-reviewed-division/compiled-cash-performance-reviewed-division.component';
import { CompiledDormantInactiveAccountReviewedDivisionComponent } from './branch_audit/division_compiler/compiled-dormant-inactive-account-division/compiled-dormant-inactive-account-reviewed-division/compiled-dormant-inactive-account-reviewed-division.component';
import { DormantInactiveAccountCreateEditComponent } from './branch_audit/dormant-inactive-account/auditor/dormant-inactive-account-create-edit/dormant-inactive-account-create-edit.component';
import { DormantInactiveAccountPendingBranchManagerComponent } from './branch_audit/dormant-inactive-account/branch-manager/dormant-inactive-account-pending-branch-manager/dormant-inactive-account-pending-branch-manager.component';
import { GeneralObservationPendingBranchManagerComponent } from './branch_audit/general_observation_and_comment/branch-manager/general-observation-pending-branch-manager/general-observation-pending-branch-manager.component';
import { IncompleteDocumentAccountCreateEditComponent } from './branch_audit/incomplete-document-account/auditor/incomplete-document-account-create-edit/incomplete-document-account-create-edit.component';
import { LoanAndAdvancePendingBranchManagerComponent } from './branch_audit/loan_and_advance/branch-manager/loan-and-advance-pending-branch-manager/loan-and-advance-pending-branch-manager.component';
import { NegotiableInstrumentCreateEditComponent } from './branch_audit/negotiable_instrument/auditor/negotiable-instrument-create-edit/negotiable-instrument-create-edit.component';
import { NegotiableInstrumentPendingBranchManagerComponent } from './branch_audit/negotiable_instrument/branch-manager/negotiable-instrument-pending-branch-manager/negotiable-instrument-pending-branch-manager.component';
import { OperationalDescripancyCreateEditComponent } from './branch_audit/operational-descripancy/auditor/operational-descripancy-create-edit/operational-descripancy-create-edit.component';
import { RegionalCompiledFindingsPendingComponent } from './branch_audit/regional_compiled_audits/regional-compiled-findings-pending/regional-compiled-findings-pending.component';
import { SuspenseAccountCreateEditComponent } from './branch_audit/suspense_account/auditor/suspense-account-create-edit/suspense-account-create-edit.component';
import { SuspenseAccountDraftingBranchComponent } from './branch_audit/suspense_account/auditor/suspense-account-drafting-branch/suspense-account-drafting-branch.component';
import { SuspenseAccountPassedBranchComponent } from './branch_audit/suspense_account/auditor/suspense-account-passed-branch/suspense-account-passed-branch.component';
import { SuspenseAccountTypeManagementComponent } from './branch_audit/suspense_account/auditor/suspense-account-type-management/suspense-account-type-management.component';
import { SuspenseAccountPendingBranchManagerComponent } from './branch_audit/suspense_account/branch-manager/suspense-account-pending-branch-manager/suspense-account-pending-branch-manager.component';

import { MemorandomCreateEditComponent } from './branch_audit/MCA/auditor/memorandom-create-edit/memorandom-create-edit.component';
import { GeneralObservationCreateEditComponent } from './branch_audit/general_observation_and_comment/Auditor/general-observation-create-edit/general-observation-create-edit.component';
import { LoanAndAdvanceCreateEditComponent } from './branch_audit/loan_and_advance/Auditor/loan-and-advance-create-edit/loan-and-advance-create-edit.component';
import { PendingNegotiableInstrumentReviewerComponent } from './branch_audit/negotiable_instrument/reviewer/pending-negotiable-instrument-reviewer/pending-negotiable-instrument-reviewer.component';
import { ReviewedNegotiableInstrumentReviewerComponent } from './branch_audit/negotiable_instrument/reviewer/reviewed-negotiable-instrument-reviewer/reviewed-negotiable-instrument-reviewer.component';
import { OperationalDescripancyReviewerComponent } from './branch_audit/operational-descripancy/service/operational-descripancy-reviewer/operational-descripancy-reviewer.component';
import { PendingSuspenseAccountReviewerComponent } from './branch_audit/suspense_account/reviewer/pending-suspense-account-reviewer/pending-suspense-account-reviewer.component';
import { ReviewedSuspenseAccountReviewerComponent } from './branch_audit/suspense_account/reviewer/reviewed-suspense-account-reviewer/reviewed-suspense-account-reviewer.component';

import { ControllableExpenseReviewerRectificationTrackerComponent } from './branch_audit/Controllable_Expense/reviewer/controllable-expense-reviewer-rectification-tracker/controllable-expense-reviewer-rectification-tracker.component';
import { MemorandomContingentReportedBranchManagerComponent } from './branch_audit/MCA/branch-manager/memorandom-contingent-reported-branch-manager/memorandom-contingent-reported-branch-manager.component';
import { CompiledApprovedAuditsBranchComponent } from './branch_audit/approver/compiled-approved-audits-branch/compiled-approved-audits-branch.component';
import { CompiledCompletedAuditsBranchComponent } from './branch_audit/approver/compiled-completed-audits-branch/compiled-completed-audits-branch.component';
import { CompiledPendingAuditsBranchComponent } from './branch_audit/approver/compiled-pending-audits-branch/compiled-pending-audits-branch.component';
import { AtmCardReviewerRectificationTrackerComponent } from './branch_audit/atm_card/reviewer/atm-card-reviewer-rectification-tracker/atm-card-reviewer-rectification-tracker.component';
import { CashCountReviewerRectificationTrackerComponent } from './branch_audit/cash_count/reviewer/cash-count-reviewer-rectification-tracker/cash-count-reviewer-rectification-tracker.component';
import { RemarkCompiledBranchAuditComponent } from './branch_audit/common/remark-branch-audit/remark-compiled-branch-audit/remark-compiled-branch-audit.component';
import { RemarkRegionalBranchAuditComponent } from './branch_audit/common/remark-branch-audit/remark-regional-branch-audit/remark-regional-branch-audit.component';
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
import { CompiledNegotiableInstrumentDivisionPendingComponent } from './branch_audit/division_compiler/compiled-negotiable-instrument-division/compiled-negotiable-instrument-division-pending/compiled-negotiable-instrument-division-pending.component';
import { CompiledNegotiableInstrumentDivisionReviewedComponent } from './branch_audit/division_compiler/compiled-negotiable-instrument-division/compiled-negotiable-instrument-division-reviewed/compiled-negotiable-instrument-division-reviewed.component';
import { CompiledStatusAuditDivisionReviewedComponent } from './branch_audit/division_compiler/compiled-status-audit-division/compiled-status-audit-division-reviewed/compiled-status-audit-division-reviewed.component';
import { CompiledStatusAuditDivisionComponent } from './branch_audit/division_compiler/compiled-status-audit-division/compiled-status-audit-division.component';
import { CompiledSuspenseAccountDivisionPendingComponent } from './branch_audit/division_compiler/compiled-suspense-account-division/compiled-suspense-account-division-pending/compiled-suspense-account-division-pending.component';
import { CompilerSuspenseAccountDivisionCompiledComponent } from './branch_audit/division_compiler/compiled-suspense-account-division/compiler-suspense-account-division-compiled/compiler-suspense-account-division-compiled.component';
import { DormantInactiveReviewerRectificationTrackerComponent } from './branch_audit/dormant-inactive-account/reviewer/dormant-inactive-reviewer-rectification-tracker/dormant-inactive-reviewer-rectification-tracker.component';
import { GeneralObservationReviewerRectificationTrackerComponent } from './branch_audit/general_observation_and_comment/reviewer/general-observation-reviewer-rectification-tracker/general-observation-reviewer-rectification-tracker.component';
import { IncompleteDocumentReviewerRectificationTrackerComponent } from './branch_audit/incomplete-document-account/reviewer/incomplete-document-reviewer-rectification-tracker/incomplete-document-reviewer-rectification-tracker.component';
import { LoanAndAdvanceReviewerRectificationTrackerComponent } from './branch_audit/loan_and_advance/Reviewer/loan-and-advance-reviewer-rectification-tracker/loan-and-advance-reviewer-rectification-tracker.component';
import { CreateEditLongOutstandingItemComponent } from './branch_audit/long_outstanding_item/auditor/create-edit-long-outstanding-item/create-edit-long-outstanding-item.component';
import { DraftedlongoutstandingitemComponent } from './branch_audit/long_outstanding_item/auditor/draftedlongoutstandingitem/draftedlongoutstandingitem.component';
import { PassedlongoutstandingitemComponent } from './branch_audit/long_outstanding_item/auditor/passedlongoutstandingitem/passedlongoutstandingitem.component';
import { LongOutstandingItemBranchManagerComponent } from './branch_audit/long_outstanding_item/branch-manager/long-outstanding-item-branch-manager/long-outstanding-item-branch-manager.component';
import { LongOutstandingReviewerRectificationTrackerComponent } from './branch_audit/long_outstanding_item/reviewer/long-outstanding-reviewer-rectification-tracker/long-outstanding-reviewer-rectification-tracker.component';
import { PendinglongoutstandingitemsComponent } from './branch_audit/long_outstanding_item/reviewer/pendinglongoutstandingitems/pendinglongoutstandingitems.component';
import { ReviewedlongoutstandingitemsComponent } from './branch_audit/long_outstanding_item/reviewer/reviewedlongoutstandingitems/reviewedlongoutstandingitems.component';
import { NegotiableInstrumentRectificationTrackerComponent } from './branch_audit/negotiable_instrument/reviewer/negotiable-instrument-rectification-tracker/negotiable-instrument-rectification-tracker.component';
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
import { ReportSuspenseAccountComponent } from './branch_audit/report/general/report-suspense-account/report-suspense-account.component';
import { ReportGeneralComponent } from './branch_audit/report/report-general/report-general.component';
import { StatusofauditpendingbmComponent } from './branch_audit/statusofaudit/branch_manager/statusofauditpendingbm/statusofauditpendingbm.component';
import { SuspenseAccountReviewerRectificationTrackerComponent } from './branch_audit/suspense_account/reviewer/suspense-account-reviewer-rectification-tracker/suspense-account-reviewer-rectification-tracker.component';
import { ApproverDashboardComponent } from './pages/dashboard/approver-dashboard/approver-dashboard.component';
import { AuditorDashboardComponent } from './pages/dashboard/auditor-dashboard/auditor-dashboard.component';
import { DdaCurrentThreeComponent } from './pages/dashboard/branch-dashboard-general/dda-current-three/dda-current-three.component';
import { DprCurrentOneComponent } from './pages/dashboard/branch-dashboard-general/dpr-current-one/dpr-current-one.component';
import { PrdaTotalFourComponent } from './pages/dashboard/branch-dashboard-general/prda-total-four/prda-total-four.component';
import { RprpfFiveComponent } from './pages/dashboard/branch-dashboard-general/rprpf-five/rprpf-five.component';
import { RrdCurrentTwoComponent } from './pages/dashboard/branch-dashboard-general/rrd-current-two/rrd-current-two.component';
import { DivisionDashboardComponent } from './pages/dashboard/division-dashboard/division-dashboard.component';
import { DraftedDetailComponent } from './pages/dashboard/drafted-detail/drafted-detail.component';
import { ReviewerDashboardComponent } from './pages/dashboard/reviewer-dashboard/reviewer-dashboard.component';

import { CashManagementRectifiedTrackerComponent } from './branch_audit/Cash_Management_Branch/reviewer/cash-management-rectified-tracker/cash-management-rectified-tracker.component';
import { MemorandumReviewerRectificationTrackerComponent } from './branch_audit/MCA/reviewer/memorandum-reviewer-rectification-tracker/memorandum-reviewer-rectification-tracker.component';
import { AbnormalBalanceReviewerRectificationTrackerComponent } from './branch_audit/abnormal-balance/reviewer/abnormal-balance-reviewer-rectification-tracker/abnormal-balance-reviewer-rectification-tracker.component';
import { AssetLiabilityReviewerRectificationTrackerComponent } from './branch_audit/asset-liability/reviewer/asset-liability-reviewer-rectification-tracker/asset-liability-reviewer-rectification-tracker.component';
import { CashPerformanceReviewerRectificationTrackerComponent } from './branch_audit/cash_performance/reviewer/cash-performance-reviewer-rectification-tracker/cash-performance-reviewer-rectification-tracker.component';
import { BranchAuditNotificationHigherRolesComponent } from './branch_audit/common/notification/branch-audit-notification-higher-roles/branch-audit-notification-higher-roles.component';
import { BranchAuditNotificationLowerRolesComponent } from './branch_audit/common/notification/branch-audit-notification-lower-roles/branch-audit-notification-lower-roles.component';
import { RemarkNotificationBranchComponent } from './branch_audit/common/notification/remark-notification-branch/remark-notification-branch.component';
import { CompiledMemorandumDivisionComponent } from './branch_audit/division_compiler/compiled-memorandum-contigent/compiled-memorandum-division/compiled-memorandum-division.component';
import { CompiledMemorandumReviewedDivisionComponent } from './branch_audit/division_compiler/compiled-memorandum-contigent/compiled-memorandum-reviewed-division/compiled-memorandum-reviewed-division.component';
import { RegionalCompiledAuditsProgressComponent } from './branch_audit/regional_compiled_audits/regional-compiled-audits-progress/regional-compiled-audits-progress.component';
import { StatusOfAuditReviewerRectificationTrackerComponent } from './branch_audit/statusofaudit/reviewer/status-of-audit-reviewer-rectification-tracker/status-of-audit-reviewer-rectification-tracker.component';
import { PasswordResetOtpComponent } from './pages/password-reset-otp/password-reset-otp.component';

@NgModule({
  declarations: [
    ApproverDashboardComponent,
    ReviewerDashboardComponent,
    AuditorDashboardComponent,
    DivisionDashboardComponent,

    ReportGeneralComponent,
    DraftedDetailComponent,
    DprCurrentOneComponent,
    RrdCurrentTwoComponent,
    DdaCurrentThreeComponent,
    PrdaTotalFourComponent,
    RprpfFiveComponent,
    ReportAbnormalBalanceComponent,
    ReportAssetLiabilitiesComponent,
    ReportDormantInactiveAccountComponent,
    ReportAccountIncompleteDocumentComponent,
    ReportControllableExpenseComponent,
    ReportSuspenseAccountComponent,
    ReportCashExcessOrShortageComponent,
    ReportCashManagementComponent,
    ReportStatusOfAuditComponent,

    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UsersProfileComponent,
    PagesLoginComponent,
    NotFoundComponent,
    ForgetPasswordComponent,
    UpdatePasswordComponent,
    InvalidTokenComponent,
    DarkModeToggleComponent,
    NeedHelpComponent,
    AdminSkeletonOneComponent,
    AdminSkeletonTwoComponent,
    AdminSkeletonThreeComponent,
    RecentActivitySkeletonComponent,
    MakerSkeletonOneComponent,
    AdminSkeletonFourComponent,
    AdminSkeletonFiveComponent,
    AdminSkeletonSixComponent,
    AdminSkeletonSevenComponent,
    ApproverSkeletonOneComponent,
    MakerApproverSkeletonComponent,
    MakerApproverOneComponent,
    MakerApproverTwoComponent,
    MakerSkeletonTwoComponent,
    MakerApproverThreeComponent,
    HoSkeletonComponent,
    SignupComponent,
    RadSkeletonComponent,
    LoanAllowedAmountSkeletonComponent,
    FcyGeneratedComponent,
    DashboardContainerComponent,


    RecommendationComponent,
    ManageRecommendationComponent,
    ManageCommonFindingComponent,
    CommonFindingComponent,
    BranchAuditComponent,
    AdminComponent,
    AssetLiabilityDraftingBranchComponent,
    AssetLiabilityPassedBranchComponent,
    AssetLiabilityPendingForReviewBranchComponent,
    AssetLiabilityReviewedBranchComponent,

    AbnormalBalanceDraftingBranchComponent,
    AbnormalBalancePassedBranchComponent,
    AbnormalBalancePendingForReviewerBranchComponent,
    AbnormalBalanceReviewedBranchComponent,
    RegionalCompiledAuditsProgressComponent,

    IncompleteAccountDraftingBranchComponent,
    IncompleteAccountPassedBranchComponent,
    IncompleteAccountOnProgressBranchComponent,
    DormantInactiveAccountPassedBranchComponent,
    IncompleteAccountPendingForReviewBranchComponent,
    IncompleteAccountReviewedBranchComponent,
    DormantInactiveAccountReviewedBranchComponent,
    DormantInactiveAccountPendingForReviewBranchComponent,
    FileUploadComponent,
    RemarkBranchAuditComponent,
    IncompleteAccountOnProgressForReviewerBranchComponent,
    OperatioalDescripancyDraftingAuditorBranchComponent,
    OperatioalDescripancyPassedAuditorBranchComponent,
    OperationalDescripancyCategoryComponent,
    OperationalDescripancyBranchManagerComponent,

    AbnormalBalancePendingBranchManagerComponent,
    AssetLiabilityPendingBranchManagerComponent,
    BranchManagerResponseComponent,
    BranchAuditComponent,

    CashPerformanceDraftingComponent,
    AtmCardPassedFindingComponent,
    AtmCardDraftingFindingComponent,
    AtmCardReviewedReviewerComponent,
    CashPerformancePassedComponent,
    ReviewerCashPerformancePendingComponent,
    ReviewerCashPerformanceReviewedComponent,
    AtmCardPendingComponent,

    AuditorMemorandumDraftingComponent,
    GeneralObservationDraftingBranchComponent,
    StatusofauditComponent,
    CompileBranchAuditsComponent,
    BranchAuditHeaderComponent,

    AuditorMemorandumDraftingComponent,
    GeneralObservationDraftingBranchComponent,
    GeneralObservationPassedBranchComponent,
    DormantInactiveAccountDraftingComponent,
    PassedStatusOfAuditComponent,
    AtmCardPendingBranchMangerComponent,
    MemorandumPassedComponent,
    ReviewerMemorandumDraftingComponent,
    ReviewerMemorandumPassedComponent,
    AuditorCashManagementPendingComponent,
    AuditorCashManagementPassedComponent,
    CompiledIncompleteDocumentAccountDivisionComponent,
    CompiledAtmCardDivisionComponent,
    CompiledCashPerformanceDivisionComponent,
    CompiledAssetLiabilityDivisionComponent,
    CompiledAbnormalBalanceDivisionComponent,
    CompiledDormantInactiveAccountDivisionComponent,
    StatusofauditreviewComponent,
    GeneralObservationPendingBranchComponent,
    GeneralObservationReviewedBranchComponent,

    CompiledIncompleteDocumentReviewedDivisionComponent,
    CompileCompiledAuditsDivisionComponent,
    StatusofauditunreviewComponent,
    CompiledAuditsDivisionComponent,
    CompiledAuditsProgressDivisionComponent,
    LoanAndAdvanceDraftedBranchComponent,
    LoanAndAdvancePassedBranchComponent,
    LoanAndAdvancePendingBranchComponent,
    LoanAndAdvanceReviewedBranchComponent,
    ReviewerCashManagementPendingComponent,
    RevieweredCashManagementComponent,
    CashCountCreatEditBranchComponent,

    IncompleteDocumentPendingBranchManagerComponent,
    CashcountdraftComponent,
    CashcountpassedComponent,

    NegotiableInstrumentDraftingBranchComponent,
    NegotiableInstrumentPassedBranchComponent,
    SuspenseAccountDraftingBranchComponent,
    SuspenseAccountPassedBranchComponent,
    SuspenseAccountTypeManagementComponent,
    NegotiableStockItemManagementComponent,

    CompiledAuditsDraftingApproverBranchComponent,
    CompiledAtmCardReviewedDivisionComponent,
    OperationalDescripancyPendingRegionalComponent,
    OperationalDescripancyReviewedRegionalComponent,
    ControllableExpensePendingComponent,
    ControllableExpensePassedComponent,
    OperationalDiscrepancyPendingDivisionComponent,
    OperationalDiscrepancyReviewedDivisionComponent,

    ControllableExpenseTypeComponent,
    ControllableReviewerPendingComponent,
    ControllableReviewerReviewedComponent,

    CashcountpendingComponent,
    CashcountreviewedComponent,
    CashcountdivisionreviewedComponent,
    CompiledCashPerformanceReviewedDivisionComponent,
    CompiledSuspenseAccountDivisionPendingComponent,
    CompilerSuspenseAccountDivisionCompiledComponent,

    RegionalCompiledFindingsPendingComponent,
    CompiledCashCountDivisionComponent,
    CompiledAbnormalBalanceReviewedDivisioComponent,
    CompiledAssetLiabilityReviewedDivisionComponent,
    CompiledDormantInactiveAccountReviewedDivisionComponent,
    CreateEditCashPerformanceBranchComponent,
    CashManagementCreateEditBranchComponent,
    ManageCurrencyComponent,
    CashCountPendingBranchManagerComponent,
    CashManagementPendingBranchManagerComponent,
    CashPerformancePendingBranchManagerComponent,
    ControllableExpensePendingBranchManagerComponent,
    DormantInactiveAccountPendingBranchManagerComponent,
    LoanAndAdvancePendingBranchManagerComponent,
    NegotiableInstrumentPendingBranchManagerComponent,
    SuspenseAccountPendingBranchManagerComponent,
    GeneralObservationPendingBranchManagerComponent,
    AbnormalBalanceCreatEditComponent,
    AssetLiabilityCreatEditComponent,
    NegotiableInstrumentCreateEditComponent,
    OperationalDescripancyCreateEditComponent,
    SuspenseAccountCreateEditComponent,
    AtmCardCreateEditComponent,
    ControllableExspenseCreateEditComponent,
    IncompleteDocumentAccountCreateEditComponent,
    DormantInactiveAccountCreateEditComponent,

    CompiledPendingAuditsBranchComponent,
    CompiledApprovedAuditsBranchComponent,
    CompiledCompletedAuditsBranchComponent,
    LoanAndAdvanceCreateEditComponent,
    GeneralObservationCreateEditComponent,
    MemorandomCreateEditComponent,
    PendingNegotiableInstrumentReviewerComponent,
    ReviewedNegotiableInstrumentReviewerComponent,
    OperationalDescripancyReviewerComponent,
    PendingSuspenseAccountReviewerComponent,
    ReviewedSuspenseAccountReviewerComponent,
    IncompleteDocumentReviewerRectificationTrackerComponent,
    AtmCardReviewerRectificationTrackerComponent,
    CashCountReviewerRectificationTrackerComponent,
    OperationalDescripancyReviewerRectificationTrackerComponent,
    NegotiableInstrumentRectificationTrackerComponent,
    DataPoolingBranchComponent,
    CompiledNegotiableInstrumentDivisionPendingComponent,
    CompiledNegotiableInstrumentDivisionReviewedComponent,
    ReportOperationalDescripencyComponent,
    GeneralObservationCommentComponent,
    MemorandumContigentComponent,
    NegotiableInstrumentComponent,
    LongOutstandinItemComponent,
    LoanAndAdvanceComponent,
    CashCountComponent,
    CreateEditLongOutstandingItemComponent,
    DraftedlongoutstandingitemComponent,
    PassedlongoutstandingitemComponent,
    PendinglongoutstandingitemsComponent,
    ReviewedlongoutstandingitemsComponent,
    LongOutstandingItemBranchManagerComponent,
    MemorandomContingentReportedBranchManagerComponent,
    CompiledLoanAdvanceDivisionComponent,
    CompiledLoanAdvanceDivisionReviewedComponent,
    CompiledLongOutstandingDivisionComponent,
    CompiledLongOutstandingDivisionReviewedComponent,
    CompiledGeneralObservationDivisionComponent,
    CompiledGeneralObservationDivisionReviewedComponent,
    CompiledCashManagementDivisionComponent,
    CompiledCashManagementDivisionReviewedComponent,
    CompiledStatusAuditDivisionComponent,
    CompiledStatusAuditDivisionReviewedComponent,
    CompiledControllableExpenseDivisionComponent,
    CompiledControllableExpenseDivisionReviewedComponent,
    StatusofauditpendingbmComponent,
    RemarkCompiledBranchAuditComponent,
    RemarkRegionalBranchAuditComponent,
    DormantInactiveReviewerRectificationTrackerComponent,
    SuspenseAccountReviewerRectificationTrackerComponent,
    ControllableExpenseReviewerRectificationTrackerComponent,
    GeneralObservationReviewerRectificationTrackerComponent,
    LongOutstandingReviewerRectificationTrackerComponent,
    LoanAndAdvanceReviewerRectificationTrackerComponent,
    AssetLiabilityReviewerRectificationTrackerComponent,
    AbnormalBalanceReviewerRectificationTrackerComponent,
    MemorandumReviewerRectificationTrackerComponent,
    CashPerformanceReviewerRectificationTrackerComponent,
    CashManagementRectifiedTrackerComponent,
    StatusOfAuditReviewerRectificationTrackerComponent,
    BranchAuditNotificationLowerRolesComponent,
    BranchAuditNotificationHigherRolesComponent,
    RemarkNotificationBranchComponent,
    CompiledMemorandumReviewedDivisionComponent,
    CompiledMemorandumDivisionComponent,
    PasswordResetOtpComponent
  ],
  imports: [
    StepsModule,
    TagModule,
    ProgressSpinnerModule,
    MultiSelectModule,
    InputSwitchModule,
    ButtonModule,
    CKEditorModule,
    EditorModule,
    PanelModule,
    PrimeNGEditor,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    jqxDataTableModule,
    jqxButtonModule,
    ModalModule,
    jqxWindowModule,
    NgChartsModule,
    TimeagoModule.forRoot(),
    DataTablesModule,
    BrowserAnimationsModule,
    FileUploadModule,
    MenuModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxSkeletonLoaderModule.forRoot({
      animation: 'progress-dark',
      loadingText: 'This item is actually loading...',
    }),
    ToastModule,
    SelectButtonModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    TabViewModule,
    AccordionModule,
    FieldsetModule,
    TimelineModule,
    CardModule,
    MenuModule,
    ListboxModule,
    DynamicDialogModule,
    DialogModule,
    SkeletonModule,
    DividerModule,
    MenubarModule,
    ChipModule,
    DataViewModule,
    SkeletonModule,
    DividerModule,
    ChipsModule,
    ChartModule,
    TieredMenuModule,
    SidebarModule,
    PasswordModule,
    KnobModule
  ],
  providers: [
    httpInterceptorProviders,
    MessageService,
    ConfirmationService,
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Currency } from 'app/branch_audit/common/currency/currency';
import { CurrencyService } from 'app/branch_audit/common/currency/currency.service';
import { LoanAndAdvanceAuditorService } from 'app/branch_audit/loan_and_advance/Auditor/Services/loan-and-advance-auditor.service';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { LoanAndAdvance } from 'app/branch_audit/model/loanAndAdvance/loan-and-advance';
import { OverDraft } from 'app/branch_audit/model/overdraft/over-draft';
import { Branches } from 'app/models/admin/branches';
import { User } from 'app/models/admin/user';
import { CommonFinding } from 'app/models/shared/audit/common-finding';
import { Recommendation } from 'app/services/approver/recommendation';
import { RecommendationService } from 'app/services/approver/recommendation.service';
import { CommonFindingService } from 'app/services/shared/audit/common-finding.service';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment.prod';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loan-and-advance-create-edit',
  templateUrl: './loan-and-advance-create-edit.component.html',
  styleUrls: ['./loan-and-advance-create-edit.component.css'],
})
export class LoanAndAdvanceCreateEditComponent {
  environment = environment;
  public Editor = ClassicEditor;
  public findingEditor = ClassicEditor;
  public impactEditor = ClassicEditor;
  public action_taken_editor = ClassicEditor;
  public recommendationEditor = ClassicEditor;

  auditEditDialog: boolean;
  editHistoryDialog: boolean;
  submitted: boolean;
  auditData = new BranchFinancialAudit();
  edit_auditee: Boolean = false;
  user = new User();
  branch = new Branches();
  change_tracker_branch_audit: ChangeTrackerBranchAudit[] = [];
  finding_change_tracker = new ChangeTrackerBranchAudit();
  impact_change_tracker = new ChangeTrackerBranchAudit();
  recommendation_change_tracker = new ChangeTrackerBranchAudit();
  action_taken_change_tracker = new ChangeTrackerBranchAudit();
  cash_type_change_tracker = new ChangeTrackerBranchAudit();

  changer = new User();

  commonFindings: CommonFinding[];
  commonFinding = new CommonFinding();
  commonFinding2 = new CommonFinding();
  is_new_finding = false;

  commonRecommendations: Recommendation[];
  commonRecommendation = new Recommendation();
  commonRecommendation2 = new Recommendation();
  is_new_recommendation = false;

  category = '';
  isEditData = false;
  auditorFileInfos: Observable<any>;

  finding_valid: boolean;
  impact_valid: boolean;
  action_taken_valid: boolean;
  recommendation_valid: boolean;
  risk_level_valid: boolean;
  auditee_valid = false;
  cash_type_valid: boolean;

  file_uploaded = true;
  today: Date = new Date();

  isLoggedIn = false;
  private roles: string[] = [];
  approver = false;
  reviewer = false;
  auditor = false;
  banking=false;

  @Input() passedAudit: any[];
  @Input() overDraftPassed: any[];
  overDraft = new OverDraft();

  @Output() editedAudit: EventEmitter<any> = new EventEmitter();

  recommendation_edit = false;
  finding_edit = false;
  findings: string[];
  recommendations: string[];
  findingDate = new Date();
  expiryDate = new Date();
  loanDisbursedDate = new Date();
  loanDuedate = new Date();
  cash_type_intial: any;
  currency: Currency[] = [];
  is_fcy = false;
  check_account_affected_account = false;
  loan_status: any[];
  repayement_mode: any[];
  Type_of_loan_data_options: any[];
  commonLoanTypes: LoanAndAdvance[] = [];
  IFBLoanTypes: LoanAndAdvance[] = [];
  dropdownLoanTypes: LoanAndAdvance[] = [];
  loanTypes: LoanAndAdvance[] = [];
  loanAndAdvance = new LoanAndAdvance();
  loanSelected = false;
  is_table = false;
  loading=false;

  public config = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'insertTable',
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        '|',
        'undo',
        'redo'
      ]
    },
    language: 'en'
  };


  constructor(
    private messageService: MessageService,
    private commonFindingService: CommonFindingService,
    private recommendationService: RecommendationService,
    private storageService: StorageService,
    private loanAndAdvanceService: LoanAndAdvanceAuditorService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.isEditData = this.passedAudit[1];
    this.auditData = new BranchFinancialAudit();
    if (this.isEditData) {
      this.openNew();
    } else {
      this.editAudit(this.passedAudit);
    }
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.approver = this.roles.includes('ROLE_APPROVER_BFA');
      this.reviewer = this.roles.includes('ROLE_REVIEWER_BFA');
      this.auditor = this.roles.includes('ROLE_AUDITOR_BFA');
    }

    this.loanTypes = [
      { loan_type: 'Conventional Loan' },
      { loan_type: 'IFB Loan' },
    ];

    this.commonLoanTypes = [
      { loan_type: 'Education and Health Services Loans' },
      { loan_type: 'AWASH BANK STAFF HOUSING AND CAR LOANS' },
      { loan_type: 'AGRI PROD. TERM LOANS DEF' },
      { loan_type: 'AGRICULTURAL PROD. OVERDRAFT-DEF' },
      { loan_type: 'TRANSPORT OVERDRAFT-DEF' },
      { loan_type: 'MANUFACTURING PROD. OVERDRAFT-DEF' },
      { loan_type: 'DOMESTIC TRADE & SERV. OVRDRFT-DEF' },
      { loan_type: 'TRANSPORT TERM LOANS DEF	' },
      { loan_type: 'MANUFACT PROD. TERM LOANS DEF' },
      { loan_type: 'EXPORT OVERDRAFT-DEF' },
      { loan_type: 'ADVANCE AGAINST EXPORT BILLS-DEF' },
      { loan_type: 'DOM TRADE & SERV. TERM LN DEF' },
      { loan_type: 'EXPORT TERM LOANS DEF' },
      { loan_type: 'IMPORT OVERDRAFT-DEF' },
      { loan_type: 'AGRO PROCESSING TERM LOAN SME-FP DEF' },
      { loan_type: 'BUILDING & CONSTR. OVERDRAFT-DEF' },
      { loan_type: 'MERCHANDISE LOAN-DEF' },
      { loan_type: 'IMPORT TERM LOANS DEF	' },
      { loan_type: 'BUILDING & CONSTR. TERM LOANS DEF' },
      { loan_type: 'PERSONAL LOANS DEF' },
      { loan_type: 'Hotel and Tourism Loans	' },
      { loan_type: 'CREDIT CARD POOL ACCOUNT' },
      { loan_type: "AB-MCF MSE's Resilience Facility" },
      { loan_type: 'Other' },
    ];

    this.IFBLoanTypes = [
      {
        loan_type:
          'Qard Financing (Interest free export financing facility)-IFB-DEF',
      },
      { loan_type: 'DTS MURABAHA FINANCING-DEF' },
      { loan_type: ' BUILDING & CONST. MURABAHA FIN-DEF' },
      { loan_type: 'Murabaha-DTS-Default' },
      { loan_type: 'Murabaha-Import-Default' },
      { loan_type: 'Murabaha-Import-Default' },
      { loan_type: 'Murabaha-Transport-Default' },
      { loan_type: 'Murabaha-Staff Housing & Car Financing' },
      { loan_type: 'Murabaha-Staff Housing & Car Financing' },
      { loan_type: 'PERSONAL LOANS DEF' },
      { loan_type: 'Murabaha Hotel and Tourism Financing' },
      { loan_type: 'Other' },
    ];


    this.loan_status = [
      { name: 'Pass', code: 'Pass ' },
      { name: 'Substandard ', code: 'Substandard' },
      { name: 'Special Mention, ', code: 'Special Mention' },
      { name: 'Doubtful ', code: 'Doubtful' },
      { name: 'Loss ', code: 'Loss' },
    ];

    this.repayement_mode = [
      { name: 'Monthly', code: 'Monthly' },
      { name: 'Quarterly ', code: 'Quarterly' },
      { name: 'Semi-annually', code: 'Semi-annually' },
      { name: 'Annually ', code: 'Annually' },
      { name: 'Lamp Sum ', code: 'Lamp Sum' },
    ];





  }

  onChangeDropDown(loan: String) {
    this.dropdownLoanTypes = loan.includes('Conventional Loan')
      ? this.commonLoanTypes
      : this.IFBLoanTypes;
    this.loanSelected = true;
    this.auditData.loanAndAdvance!.loan_type = ""
  }


  getCommonFindings() {
    this.commonFindingService
      .getFindingsByAuditType('LoanAndAdvance')
      .subscribe(
        (response) => {
          this.commonFinding.content = 'New Finding';
          this.commonFindings = response;
          if (!this.isEditData) {
            let finding: any;
            finding = this.auditData.finding;
            this.commonFinding2.content = finding;
            this.commonFindings.push(this.commonFinding2);
          }
          this.commonFindings.push(this.commonFinding);
          this.is_new_finding = this.commonFindings.length > 1 ? false : true;
          // let common_findings: any[] = [];
          // if (this.commonFindings) {
          //   common_findings = this.commonFindings
          //     .filter((finding: CommonFinding) => finding?.content)
          //     .map((finding: CommonFinding) => finding?.content);
          // }
          // this.finding_edit = common_findings.includes(this.auditData.finding);
        },
        () => (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary:
              error.status == 401
                ? 'You are not permitted to perform this action!'
                : 'Something went wrong while fetching common findings!',
            detail: '',
          });
        }
      );
  }

  onChangeFindingDropdown(finding: String) {
    if (finding != null) {
      this.finding_valid = finding.length > 0 ? true : false;

      if (finding.includes('New Finding')) {
        this.is_new_finding = true;
      } else {
        this.auditData.finding = finding;
        this.finding_change_tracker.change =
          '<strong>Finding: </strong>' + finding;
        this.finding_change_tracker.content_type = 'editor';
        this.change_tracker_branch_audit[0] = this.finding_change_tracker;
      }
    }
  }

  getCommonRecommendations() {
    this.recommendationService
      .getRecommondationsByAuditType('LoanAndAdvance')
      .subscribe(
        (response) => {
          this.commonRecommendation.content = 'New Recommendation';
          this.commonRecommendations = response;
          if (!this.isEditData) {
            this.commonRecommendation2.content = this.auditData.recommendation;
            this.commonRecommendations.push(this.commonRecommendation2);
          }
          this.commonRecommendations.push(this.commonRecommendation);
          this.is_new_recommendation =
            this.commonRecommendations.length > 1 ? false : true;

          // let common_recommendations: any[] = [];
          // if (this.commonRecommendations) {
          //   common_recommendations = this.commonRecommendations
          //     .filter((recommendation: Recommendation) => recommendation?.content)
          //     .map((recommendation: Recommendation) => recommendation?.content);
          // }
          // this.recommendation_edit = common_recommendations.includes(
          //   this.auditData.recommendation
          // );
        },
        () => (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary:
              error.status == 401
                ? 'You are not permitted to perform this action!'
                : 'Something went wrong while fetching common recommendations!',
            detail: '',
          });
        }
      );
  }

  changeBanking(banking: any) {
    this.banking = true;
   }

  onChangeRecommendationDropdown(recommendation: String) {
    if (recommendation != null) {
      this.recommendation_valid = recommendation.length > 0 ? true : false;
      if (recommendation.includes('New Recommendation')) {
        this.is_new_recommendation = true;
      } else {
        this.auditData.recommendation = recommendation;
        this.recommendation_change_tracker.change =
          '<strong>Recommendation: </strong>' + recommendation;
        this.recommendation_change_tracker.content_type = 'editor';
        this.change_tracker_branch_audit[2] =
          this.recommendation_change_tracker;
      }
    }
  }

  editAudit(passedData: any[]) {
    this.auditData = passedData[0];
    if (this.auditData.loanAndAdvance?.overDraft) {
      this.overDraft = this.auditData.loanAndAdvance?.overDraft;
    }

    this.recommendation_change_tracker = {};
    this.impact_change_tracker = {};
    this.finding_change_tracker = {};
    this.cash_type_change_tracker = {};
    this.cash_type_intial = this.auditData.loanAndAdvance?.cash_type;
    this.cash_type_valid = true;

    this.getCommonFindings();
    this.getCommonRecommendations();
    let findingDate: any;
    findingDate = this.auditData.finding_date;
    this.findingDate = new Date(findingDate);

    let expiry_date: any;
    expiry_date = this.auditData.loanAndAdvance!.overDraft?.expiry_date;
    this.expiryDate = new Date(expiry_date);

    let disbursed_date: any;
    disbursed_date = this.auditData.loanAndAdvance?.loan_disbursed_date;
    this.loanDisbursedDate = new Date(disbursed_date);

    // let due_date: any;
    // due_date = this.auditData.loanAndAdvance?.due_date;
    // this.loanDuedate = new Date(due_date);

    this.finding_valid = true;
    this.impact_valid = true;
    this.recommendation_valid = true;
    this.auditee_valid = true;
    this.risk_level_valid = true;
    this.cash_type_valid = true;
    if (this.cash_type_intial == 'FCY') {
      this.is_fcy = true;
    }

    this.banking = true;

  }

  openNew() {
    this.auditData = new BranchFinancialAudit();
    this.recommendation_change_tracker = {};
    this.impact_change_tracker = {};
    this.finding_change_tracker = {};
    this.action_taken_change_tracker = {};
    this.cash_type_change_tracker = {};

    this.getCommonFindings();
    this.getCommonRecommendations();

    this.findingDate = new Date();

    this.expiryDate = new Date();

    // this.loanDuedate = new Date();

    this.loanDisbursedDate = new Date();

    this.finding_valid = false;
    this.impact_valid = false;
    this.recommendation_valid = false;
    this.auditee_valid = false;
    this.risk_level_valid = false;

    this.cash_type_valid = false;
  }

  emitData(data: any[]) {
    this.editedAudit.emit(data);
  }

  saveAudit() {
    this.user.id = this.storageService.getUser().id;
    if (this.auditor) {
      const user = this.storageService.getUser();
      this.user.category = user.category;
      this.branch = user.branch;
      this.user.branch = this.branch;
      this.auditData.auditor = this.user;
    } else if (this.reviewer) {
      this.auditData.reviewer = this.user;
    } else if (this.approver) {
      this.auditData.approver = this.user;
    }

    let expiry_date: any;
    expiry_date = this.expiryDate;
    this.overDraft!.expiry_date = expiry_date;

    // let due_date: any;
    // due_date = this.loanDuedate;
    // this.auditData.loanAndAdvance!.due_date = due_date;

    let disbursed_date: any;
    disbursed_date = this.loanDisbursedDate;
    this.auditData.loanAndAdvance!.loan_disbursed_date = disbursed_date;
    this.auditData.loanAndAdvance!.overDraft = this.overDraft;

    this.auditData.edit_auditee = this.edit_auditee;
    this.changer.id = this.storageService.getUser().id;
    this.auditData.editor = this.changer;
    this.auditData.change_tracker_branch_audit =
      this.change_tracker_branch_audit;
    this.auditData.audit_type = 'Loan and Advance';
    if (this.edit_auditee) {
      if (!this.auditData.file_urls) {
        this.file_uploaded = false;
      } else {
        this.file_uploaded = true;
      }
    } else {
      this.file_uploaded = true;
    }

    this.auditData.category = this.user.category;

    if (this.file_uploaded) {
      this.loading=true;
      this.loanAndAdvanceService
        .createLoanAndAdvance(this.auditData)
        .subscribe({
          next: () => {
            if (this.auditData.id) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audit Updated',
                life: 3000,
              });
            } else {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audit Created',
                life: 3000,
              });
              this.auditData = new BranchFinancialAudit();
            }
            this.passedAudit = [];
            this.passedAudit.push(this.auditData);
            this.passedAudit.push(this.isEditData);
            this.emitData(this.passedAudit);
          },
          error: (error: HttpErrorResponse) => {
            this.loading=false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                error.status == 401
                  ? 'You are not permitted to perform this action!'
                  : 'Something went wrong while either creating or updating finding!',
              life: 3000,
            });
          },
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please upload files before pressing the save button.',
        life: 3000,
      });
    }
  }

  changeEditAuditee() {
    this.auditData.edit_auditee = this.edit_auditee;
  }

  changeFinding(editor: any, audit: BranchFinancialAudit) {
    editor.model.document.on('change:data', () => {
      this.finding_valid = editor.getData().length > 0 ? true : false;
      if (audit.finding) {
        if (audit.finding != editor.getData()) {
          this.finding_change_tracker.change =
            '<strong>Finding: </strong>' + editor.getData();
          this.finding_change_tracker.content_type = 'editor';
          this.change_tracker_branch_audit[0] = this.finding_change_tracker;
        } else {
          this.finding_change_tracker = new ChangeTrackerBranchAudit();
          this.change_tracker_branch_audit[0] = {};
        }
      }
    });
  }

  changeImpact(editor: any, audit: BranchFinancialAudit) {
    editor.model.document.on('change:data', () => {
      this.impact_valid = editor.getData().length > 0 ? true : false;
      if (audit.impact) {
        if (audit.impact != editor.getData()) {
          this.impact_change_tracker.change =
            '<strong>Impact: </strong>' + editor.getData();
          this.impact_change_tracker.content_type = 'editor';
          this.change_tracker_branch_audit[1] = this.impact_change_tracker;
        } else {
          this.impact_change_tracker = new ChangeTrackerBranchAudit();
          this.change_tracker_branch_audit[1] = {};
        }
      }
    });
  }

  changeActionTaken(editor: any, audit: BranchFinancialAudit) {
    editor.model.document.on('change:data', () => {
      this.action_taken_valid = editor.getData().length > 5 ? true : false;
      if (audit.cashPerformanceBranch) {
        if (audit.cashPerformanceBranch?.action_taken != editor.getData()) {
          this.action_taken_change_tracker.change =
            '<strong>Action Taken: </strong>' + editor.getData();
          this.action_taken_change_tracker.content_type = 'editor';
          this.change_tracker_branch_audit[1] = this.impact_change_tracker;
        } else {
          this.action_taken_change_tracker = new ChangeTrackerBranchAudit();
          this.change_tracker_branch_audit[3] = {};
        }
      }
    });
  }

  changeRecommendation(editor: any, audit: BranchFinancialAudit) {
    editor.model.document.on('change:data', () => {
      this.recommendation_valid = editor.getData().length > 0 ? true : false;
      if (audit.recommendation)
        if (audit.recommendation != editor.getData()) {
          this.recommendation_change_tracker.change =
            '<strong>Recommendation: </strong>' + editor.getData();
          this.recommendation_change_tracker.content_type = 'editor';
          this.change_tracker_branch_audit[2] =
            this.recommendation_change_tracker;
        } else {
          this.recommendation_change_tracker = new ChangeTrackerBranchAudit();
          this.change_tracker_branch_audit[2] = {};
        }
    });
  }

  onDataChange(data: any) {
    this.auditData.file_urls = data;
  }

  changeCashType(cash_type: any, audit: BranchFinancialAudit) {
    if (cash_type == 'FCY') {
      this.getCurrency();
      this.is_fcy = true;
    } else {
      this.is_fcy = false;
    }

    this.cash_type_valid = cash_type.length != 0 ? true : false;
    if (cash_type != this.cash_type_intial) {
      this.cash_type_change_tracker.change = 'Currency Type: ' + cash_type;
      this.cash_type_change_tracker.content_type = 'normal';
      this.change_tracker_branch_audit[3] = this.cash_type_change_tracker;
    } else {
      this.cash_type_change_tracker = new ChangeTrackerBranchAudit();
      this.change_tracker_branch_audit[3] = {};
    }
  }

  computeDifference() {
    if (this.overDraft?.approved_amount && this.overDraft.overdrawn_balance) {
      this.overDraft.difference =
        this.overDraft.approved_amount - this.overDraft?.overdrawn_balance;
    }
  }

  getCurrency() {
    this.currencyService.getCurrency().subscribe({
      next: (data) => {
        this.currency = data;
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while fetching currencies!',
          detail: '',
        });
      },
    });
  }

  checkTable() {
    this.is_new_recommendation = this.is_table;
    this.is_new_finding = this.is_table;
  }
}

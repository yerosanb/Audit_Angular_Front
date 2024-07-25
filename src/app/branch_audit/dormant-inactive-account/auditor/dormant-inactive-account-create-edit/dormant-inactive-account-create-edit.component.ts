import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Currency } from 'app/branch_audit/common/currency/currency';
import { CurrencyService } from 'app/branch_audit/common/currency/currency.service';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
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
import { DormantInactiveAccountAuditorBranchService } from '../service/dormant-inactive-account-auditor-branch.service';

@Component({
  selector: 'app-dormant-inactive-account-create-edit',
  templateUrl: './dormant-inactive-account-create-edit.component.html',
  styleUrls: ['./dormant-inactive-account-create-edit.component.css'],
})
export class DormantInactiveAccountCreateEditComponent {
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
  file_uploaded = true;
  today: Date = new Date();

  isLoggedIn = false;
  private roles: string[] = [];
  approver = false;
  reviewer = false;
  auditor = false;
  banking=false;
  loading=false;

  @Input() passedAudit: any[];
  @Output() editedAudit: EventEmitter<any> = new EventEmitter();

  recommendation_edit = false;
  finding_edit = false;

  findings: string[];
  recommendations: string[];

  dateOfAccountDeactivated = new Date();
  dateOfDescripancy = new Date();
  changeTrackerBranchAudit: ChangeTrackerBranchAudit[] = [];
  account_type_change_tracker = new ChangeTrackerBranchAudit();
  edit_history_table_tracker = new ChangeTrackerBranchAudit();

  account_type_intial: any;

  cash_type_intial: any;

  currency: Currency[] = [];

  is_fcy = false;
  cash_type_change_tracker = new ChangeTrackerBranchAudit();
  cash_type_valid: boolean;
is_table = false;

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
    private dormantInactiveAccountAuditorBranchService: DormantInactiveAccountAuditorBranchService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    let auditor_id = this.storageService.getUser().id;
    let category = this.storageService.getUser().category;
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
  }



  editAudit(passedData: any[]) {
    this.auditData = passedData[0];
    this.recommendation_change_tracker = {};
    this.impact_change_tracker = {};
    this.finding_change_tracker = {};
    this.getCommonFindings();
    this.getCommonRecommendations();
    let descripancy_date: any;
    descripancy_date = this.auditData.finding_date;
    this.dateOfDescripancy = new Date(descripancy_date);

    let account_deactivated_Date: any;
    account_deactivated_Date = this.auditData.dormantInactive!.deactivated_date;
    this.dateOfAccountDeactivated = new Date(account_deactivated_Date);

    this.cash_type_change_tracker = {};
    this.cash_type_intial = this.auditData.dormantInactive?.cash_type;
    this.cash_type_valid = true;

    this.finding_valid = true;
    this.impact_valid = true;
    this.recommendation_valid = true;
    this.auditee_valid = true;
    this.risk_level_valid = true;

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
    this.getCommonFindings();
    this.getCommonRecommendations();

    this.dateOfDescripancy = new Date();
    this.dateOfAccountDeactivated = new Date();

    this.finding_valid = false;
    this.impact_valid = false;
    this.recommendation_valid = false;
    this.auditee_valid = false;
    this.risk_level_valid = false;
    this.cash_type_change_tracker = {};
    this.cash_type_valid = false;
  }

  emitData(data: any[]) {
    this.editedAudit.emit(data);
  }




  getCommonFindings() {
    this.commonFindingService
      .getFindingsByAuditType('AbnormalBalance')
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

  changeBanking(banking: any) {
    this.banking = true;
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
      .getRecommondationsByAuditType('AbnormalBalance')
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

    let finding_date: any;
    finding_date = this.dateOfDescripancy;
    this.auditData.finding_date = finding_date;

    let dateofaccountDeactivated: any;
    dateofaccountDeactivated = this.dateOfAccountDeactivated;
    this.auditData.dormantInactive!.deactivated_date = dateofaccountDeactivated;

    this.auditData.edit_auditee = this.edit_auditee;
    this.changer.id = this.storageService.getUser().id;
    this.auditData.editor = this.changer;
    this.auditData.change_tracker_branch_audit =
      this.change_tracker_branch_audit;
    this.auditData.audit_type = 'Dormant Inactive';
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
      this.dormantInactiveAccountAuditorBranchService
        .create_audit(this.auditData)
        .subscribe({
          next: (response) => {
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
      this.finding_valid = editor.getData().length > 5 ? true : false;
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
      this.impact_valid = editor.getData().length > 5 ? true : false;
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
      this.recommendation_valid = editor.getData().length > 5 ? true : false;
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

  changeAccountType(account_type: any, audit: BranchFinancialAudit) {
    if (account_type != this.account_type_intial) {
      this.account_type_change_tracker.change = 'Account Type: ' + account_type;
      this.account_type_change_tracker.content_type = 'normal';
      this.changeTrackerBranchAudit[3] = this.account_type_change_tracker;
    } else {
      this.account_type_change_tracker = new ChangeTrackerBranchAudit();
      this.changeTrackerBranchAudit[3] = {};
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
  checkTable() {
    this.is_new_recommendation = this.is_table;
    this.is_new_finding = this.is_table;
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { LongoutstandingitemauditorService } from '../longoutstandingitemauditor.service';

@Component({
  selector: 'app-create-edit-long-outstanding-item',
  templateUrl: './create-edit-long-outstanding-item.component.html',
  styleUrls: ['./create-edit-long-outstanding-item.component.css'],
})
export class CreateEditLongOutstandingItemComponent implements OnInit {
  environment = environment;
  public Editor = ClassicEditor;
  public findingEditor = ClassicEditor;
  public impactEditor = ClassicEditor;
  public justificationEditor = ClassicEditor;
  public action_taken_editor = ClassicEditor;
  public recommendationEditor = ClassicEditor;
  is_new_finding = false;
  commonFindings: CommonFinding[];
  commonFinding = new CommonFinding();
  isEditData = false;
  auditData = new BranchFinancialAudit();
  commonFinding2 = new CommonFinding();
  finding_valid: boolean;
  finding_change_tracker = new ChangeTrackerBranchAudit();
  change_tracker_branch_audit: ChangeTrackerBranchAudit[] = [];
  commonRecommendations: Recommendation[];
  commonRecommendation = new Recommendation();
  commonRecommendation2 = new Recommendation();
  is_new_recommendation = false;
  recommendation_valid: boolean;
  recommendation_change_tracker = new ChangeTrackerBranchAudit();
  impact_valid: boolean;
  impact_change_tracker = new ChangeTrackerBranchAudit();
  items: any[];
  edit_auditee: Boolean = false;
  auditee_valid = false;
  user = new User();
  approver = false;
  reviewer = false;
  auditor = false;
  branch = new Branches();
  findingDate = new Date();
  changer = new User();
  file_uploaded = true;
  isLoggedIn = false;
  private roles: string[] = [];
  cashtype: any[];
  is_fcy = false;
  cash_type_valid: boolean;
  cash_type_intial: any;
  cash_type_change_tracker = new ChangeTrackerBranchAudit();
  currency: Currency[] = [];
  banking=false;
  loading=false;

  @Input() passedAudit: any[];
  @Output() editedAudit: EventEmitter<any> = new EventEmitter();

  ageOfItems: any[];

  less_than_90 = false;
  between_90_180 = false;
  between_180_365 = false;
  greater_than_365 = false;
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
    private service: LongoutstandingitemauditorService,
    private storageService: StorageService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.items = [
      { item: 'UN Cleared Effect', value: 'UN Cleared Effect' },
      { item: 'S/Dr-Debtor', value: 'S/Dr-Debtor' },
      { item: 'S/Cr-Creditor', value: 'S/Cr-Creditor' },
      { item: 'Other', value: 'Other' },
    ];

    this.ageOfItems = [
      { name: 'Less than 90', value: 'less_than_90' },
      { name: 'Between 90 and 180', value: 'between_90_180' },
      { name: 'Between 180 and 365', value: 'between_180_365' },
      { name: 'Greater than 365', value: 'greater_than_365' },
    ];

    this.cashtype = [
      { type: 'Local Currency', value: 'LCY' },
      { type: 'Foreign Currency', value: 'FCY' },
      { type: 'Petty Cash', value: 'Petty Cash' },
      { type: 'ATM Cash', value: 'ATM Cash' },
      { type: 'Other', value: 'Other' },
    ];

    // let auditor_id = this.storageService.getUser().id;
    // let category = this.storageService.getUser().category;
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

  onSelectAgeOfItem(age: String) {
    this.less_than_90 = age.includes('less_than_90') ? true : false;
    this.between_90_180 = age.includes('between_90_180') ? true : false;
    this.between_180_365 = age.includes('between_180_365') ? true : false;
    this.greater_than_365 = age.includes('greater_than_365') ? true : false;
  }

  getCommonFindings() {
    this.commonFindingService
      .getFindingsByAuditType('LongOutstandingItem')
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
        (error) => (error: HttpErrorResponse) => {
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

  getCommonRecommendations() {
    this.recommendationService
      .getRecommondationsByAuditType('LongOutstandingItem')
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
        },
        (error) => (error: HttpErrorResponse) => {
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

  changeBanking(banking: any) {
    this.banking = true;
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

  onChangeCashCountTypeDropdown(cash_count_type: String) {
    if (cash_count_type != null) {
      if (cash_count_type == 'FCY') {
        this.getCurrency();
        this.is_fcy = true;
      } else {
        this.is_fcy = false;
      }
      this.cash_type_valid = cash_count_type.length != 0 ? true : false;
      if (cash_count_type != this.cash_type_intial) {
        this.cash_type_change_tracker.change =
          'Cash Count Type: ' + cash_count_type;
        this.cash_type_change_tracker.content_type = 'normal';
        this.change_tracker_branch_audit[3] = this.cash_type_change_tracker;
      } else {
        this.cash_type_change_tracker = new ChangeTrackerBranchAudit();
        this.change_tracker_branch_audit[3] = {};
      }
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

  // getTotalAmount() {
  //   if (this.auditData.long_outstanding) {
  //     this.auditData.long_outstanding.less_than_90_amount = this.auditData
  //       .long_outstanding.less_than_90_amount
  //       ? this.auditData.long_outstanding.less_than_90_amount
  //       : 0;
  //     this.auditData.long_outstanding.less_than_90_number = this.auditData
  //       .long_outstanding.less_than_90_number
  //       ? this.auditData.long_outstanding.less_than_90_number
  //       : 0;
  //     this.auditData.long_outstanding.greater_than_90_amount = this.auditData
  //       .long_outstanding.greater_than_90_amount
  //       ? this.auditData.long_outstanding.greater_than_90_amount
  //       : 0;
  //     this.auditData.long_outstanding.greater_than_90_number = this.auditData
  //       .long_outstanding.greater_than_90_number
  //       ? this.auditData.long_outstanding.greater_than_90_number
  //       : 0;
  //     this.auditData.long_outstanding.greater_than_180_amount = this.auditData
  //       .long_outstanding.greater_than_180_amount
  //       ? this.auditData.long_outstanding.greater_than_180_amount
  //       : 0;
  //     this.auditData.long_outstanding.greater_than_180_number = this.auditData
  //       .long_outstanding.greater_than_180_number
  //       ? this.auditData.long_outstanding.greater_than_180_number
  //       : 0;
  //     this.auditData.long_outstanding.greater_than_365_amount = this.auditData
  //       .long_outstanding.greater_than_365_amount
  //       ? this.auditData.long_outstanding.greater_than_365_amount
  //       : 0;
  //     this.auditData.long_outstanding.greater_than_365_number = this.auditData
  //       .long_outstanding.greater_than_365_number
  //       ? this.auditData.long_outstanding.greater_than_365_number
  //       : 0;

  //     if (
  //       this.auditData.long_outstanding.less_than_90_amount != null &&
  //       this.auditData.long_outstanding.less_than_90_number != null &&
  //       this.auditData.long_outstanding.greater_than_90_amount != null &&
  //       this.auditData.long_outstanding.greater_than_90_number != null &&
  //       this.auditData.long_outstanding.greater_than_180_amount != null &&
  //       this.auditData.long_outstanding.greater_than_180_number != null &&
  //       this.auditData.long_outstanding.greater_than_365_amount != null &&
  //       this.auditData.long_outstanding.greater_than_365_number != null
  //     ) {
  //       this.auditData.long_outstanding.total_amount =
  //         this.auditData.long_outstanding.less_than_90_amount *
  //           this.auditData.long_outstanding.less_than_90_number +
  //         this.auditData.long_outstanding.greater_than_90_amount *
  //           this.auditData.long_outstanding.greater_than_90_number +
  //         this.auditData.long_outstanding.greater_than_180_amount *
  //           this.auditData.long_outstanding.greater_than_180_number +
  //         this.auditData.long_outstanding.greater_than_365_amount *
  //           this.auditData.long_outstanding.greater_than_365_number;
  //       this.getDifference();
  //     }
  //   }
  // }

  getTotalAmount() {
    if (this.auditData.long_outstanding) {
      this.auditData.long_outstanding.less_than_90_amount = this.auditData
        .long_outstanding.less_than_90_amount
        ? this.auditData.long_outstanding.less_than_90_amount
        : 0;
      this.auditData.long_outstanding.less_than_90_number = this.auditData
        .long_outstanding.less_than_90_number
        ? this.auditData.long_outstanding.less_than_90_number
        : 0;
      this.auditData.long_outstanding.greater_than_90_amount = this.auditData
        .long_outstanding.greater_than_90_amount
        ? this.auditData.long_outstanding.greater_than_90_amount
        : 0;
      this.auditData.long_outstanding.greater_than_90_number = this.auditData
        .long_outstanding.greater_than_90_number
        ? this.auditData.long_outstanding.greater_than_90_number
        : 0;
      this.auditData.long_outstanding.greater_than_180_amount = this.auditData
        .long_outstanding.greater_than_180_amount
        ? this.auditData.long_outstanding.greater_than_180_amount
        : 0;
      this.auditData.long_outstanding.greater_than_180_number = this.auditData
        .long_outstanding.greater_than_180_number
        ? this.auditData.long_outstanding.greater_than_180_number
        : 0;
      this.auditData.long_outstanding.greater_than_365_amount = this.auditData
        .long_outstanding.greater_than_365_amount
        ? this.auditData.long_outstanding.greater_than_365_amount
        : 0;
      this.auditData.long_outstanding.greater_than_365_number = this.auditData
        .long_outstanding.greater_than_365_number
        ? this.auditData.long_outstanding.greater_than_365_number
        : 0;

      if (
        this.auditData.long_outstanding.less_than_90_amount != null &&
        this.auditData.long_outstanding.greater_than_90_amount != null &&
        this.auditData.long_outstanding.greater_than_180_amount != null &&
        this.auditData.long_outstanding.greater_than_365_amount != null
      ) {
        this.auditData.long_outstanding.total_amount =
          this.auditData.long_outstanding.less_than_90_amount  +
          this.auditData.long_outstanding.greater_than_90_amount  +
          this.auditData.long_outstanding.greater_than_180_amount  +
          this.auditData.long_outstanding.greater_than_365_amount;
        this.getDifference();
      }
    }
  }

  getDifference() {
    if (this.auditData.long_outstanding) {
      if (
        this.auditData.long_outstanding.total_amount != null &&
        this.auditData.long_outstanding.trial_balance != null
      ) {
        this.auditData.long_outstanding.difference = Math.abs(
          this.auditData.long_outstanding.total_amount -
            this.auditData.long_outstanding.trial_balance
        );
      }
    }
  }

  changeEditAuditee() {
    this.auditData.edit_auditee = this.edit_auditee;
  }

  onDataChange(data: any) {
    this.auditData.file_urls = data;
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
    finding_date = this.findingDate;
    this.auditData.finding_date = finding_date;

    this.auditData.edit_auditee = this.edit_auditee;
    this.changer.id = this.storageService.getUser().id;

    this.auditData.editor = this.changer;
    this.auditData.change_tracker_branch_audit =
      this.change_tracker_branch_audit;

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
    if (this.auditData.long_outstanding!.selected_items_age) {
      this.auditData.long_outstanding!.selected_item_age =
        this.auditData.long_outstanding!.selected_items_age.join(', ');
    }
    if (this.file_uploaded) {
      this.loading=true;
      this.service.saveLongOutstandingItems(this.auditData).subscribe({
        next: (response) => {
          if (this.auditData.id) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Long Outstanding Items Updated',
              life: 3000,
            });
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Long Outstanding Items Created',
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
                : 'Something went wrong while either creating or updating long outstanding item!',
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

  emitData(data: any[]) {
    this.editedAudit.emit(data);
  }

  openNew() {
    this.auditData = new BranchFinancialAudit();
    this.recommendation_change_tracker = {};
    this.impact_change_tracker = {};
    this.finding_change_tracker = {};
    this.getCommonFindings();
    this.getCommonRecommendations();
    this.findingDate = new Date();

    this.finding_valid = false;
    this.impact_valid = false;
    this.recommendation_valid = false;
    this.auditee_valid = false;
  }

  editAudit(passedData: any[]) {
    this.auditData = passedData[0];
    this.recommendation_change_tracker = {};
    this.impact_change_tracker = {};
    this.finding_change_tracker = {};
    this.getCommonFindings();
    this.getCommonRecommendations();
    let findingDate: any;
    findingDate = this.auditData.finding_date;
    this.findingDate = new Date(findingDate);
    this.finding_valid = true;
    this.impact_valid = true;
    this.recommendation_valid = true;
    this.auditee_valid = true;

    if (this.auditData.long_outstanding?.selected_item_age) {
      this.auditData.long_outstanding.selected_items_age =
        this.auditData.long_outstanding?.selected_item_age.split(', ');
    }

    this.cash_type_intial = this.auditData.long_outstanding?.cash_type;

    if (this.cash_type_intial == 'FCY') {
      this.is_fcy = true;
    }
    if (this.auditData.long_outstanding?.selected_item_age) {
      this.onSelectAgeOfItem(
        this.auditData.long_outstanding?.selected_item_age
      );
    }

    this.banking = true;

  }


  checkTable() {
    this.is_new_recommendation = this.is_table;
    this.is_new_finding = this.is_table;
  }
}

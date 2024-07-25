import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CashcountpassedService } from 'app/branch_audit/cash_count/auditor/cashcountpassed/cashcountpassed.service';
import { BranchManagerResponseService } from 'app/branch_audit/common/service/branch-manager-response.service';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { RemarkBranchAuditService } from 'app/branch_audit/services/remark-branch-audit.service';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment.prod';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { LongoutstandingitemauditorService } from '../longoutstandingitemauditor.service';

@Component({
  selector: 'app-passedlongoutstandingitem',
  templateUrl: './passedlongoutstandingitem.component.html',
  styleUrls: ['./passedlongoutstandingitem.component.css']
})
export class PassedlongoutstandingitemComponent implements OnInit {
  environment = environment;
  public Editor = ClassicEditor;
  auditor_id!: any;
  loading: boolean = true;
  audits: BranchFinancialAudit[];
  audit = new BranchFinancialAudit();
  selectedLongOutstanding: BranchFinancialAudit[] = [];
  errorMessage='';
  submitted:boolean;
  outputBranchFinancialAudit: BranchFinancialAudit[] = [];
  auditeeResponseDialog = false;
  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];
  fileInfos: Observable<any>;
  row_detail_change_tracker: ChangeTrackerBranchAudit[] = [];
  changer = new User();
  edit_history_table_tracker_list: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker = new ChangeTrackerBranchAudit();
  audit_edit_history: BranchFinancialAudit[];
  auditor_change_tracker: ChangeTrackerBranchAudit[] = [];
  reviewer_change_tracker: ChangeTrackerBranchAudit[] = [];
  approver_change_tracker: ChangeTrackerBranchAudit[] = [];
  editHistoryDialog: boolean;
  audits_rectification: BranchFinancialAudit[] = [];
  audit_rectification = new BranchFinancialAudit();
  unseenRemark = new RemarkBranchAudit();
  currentUser = new User();
  unseen_remark = 0;
  audit_remark = new BranchFinancialAudit();
  auditRemarkDialog = false;

editorConfig  : any ={}

  constructor(
    private storageService: StorageService,
    private service: LongoutstandingitemauditorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fileService: BranchFinancialAuditService,
    private auditeeResponseService: BranchManagerResponseService,
    private cashcountservice: CashcountpassedService,
    private remarkService: RemarkBranchAuditService,
  ) {}
  ngOnInit(): void {
    let auditor_id = this.storageService.getUser().id;
    this.getPassedLongOutstandingItems(auditor_id);

    this.editorConfig = {
      base_url: '/tinymce',
      suffix: '.min',
      height: 300,
      plugins: [
        'advlist',
        'autolink',
        'lists',
        'link',
        'image',
        'charmap',
        'preview',
        'anchor',
        'searchreplace',
        'visualblocks',
        'fullscreen',
        'insertdatetime',
        'media',
        'table',
        'help',
        'wordcount',
      ],
      toolbar:
        'undo redo | casechange blocks | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist  outdent indent | removeformat |  code table help|cell merge',
    };
  }

  getPassedLongOutstandingItems(auditor_id: number) {
    this.service.getPassedLongOutstandingItems(auditor_id).subscribe(
      (response) => {
        this.audits = response;
        this.loading=false;
        //console.log(this.audits);
      },
      (error) => (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while fetching long outstanding items!',
          detail: '',
        });
      }
    );


  }

  clear(table: Table) {
    table.clear();
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  rectifySelectedLongOutstandingItems() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to rectify selected audits?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.auditeeResponseService
          .rectify_auditee_response(this.selectedLongOutstanding)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter((val) => !this.selectedLongOutstanding.includes(val));
              this.selectedLongOutstanding = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Long outstanding Items rectified',
                life: 3000,
              });
            },
            error: (error: HttpErrorResponse) => {
              this.loading = false;
              this.errorMessage = error.message;
              this.submitted = true;
              this.messageService.add({
                severity: 'error',
                summary:
                  error.status == 401
                    ? 'You are not permitted to perform this action!'
                    : 'Something went wrong while rectifiying long outstanding items!',
                detail: '',
              });
            },
          });
      },
    });
  }


  addAuditeeResponseForSelectedlongOutstanding() {
    this.auditeeResponseDialog = true;
    this.outputBranchFinancialAudit = this.selectedLongOutstanding;
    this.auditeeResponseDialog = true;
  }

  onDataChange(data: BranchFinancialAudit[]) {
    if (data) {
      for (const dt of data) {
        if (dt.id) this.audits[this.findIndexById(dt.id)] = dt;
      }
    }
    this.auditeeResponseDialog = false;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.audits.length; i++) {
      if (this.audits[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  hideDialog() {
    this.auditeeResponseDialog=false;
    this.editHistoryDialog=false;
    this.auditRemarkDialog=false;
    this.submitted = false;
  }

  backSelectedItems() {
    this.selectedLongOutstanding = this.selectedLongOutstanding.filter(
      (audit) => audit.review_status === 0);
    if (this.selectedLongOutstanding.length > 0) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to back the selected long outstanding items?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cashcountservice.backSelectedCashCount(this.selectedLongOutstanding).subscribe({
          next: (response) => {
            this.audits = this.audits.filter(
              (val) => !this.selectedLongOutstanding.includes(val)
            );
            this.selectedLongOutstanding = [];
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Long Outstanding Items Deleted',
              life: 3000,
            });
          },
          error: (error: HttpErrorResponse) => {
            this.loading = false;
            this.errorMessage = error.message;
            this.submitted = true;
            this.messageService.add({
              severity: 'error',
              summary:
                error.status == 401
                  ? 'You are not permitted to perform this action!'
                  : 'Something went wrong while deleting long outstanding items!',
              detail: '',
            });
          },
        });
      },
    });
  } else {
    this.messageService.add({
      severity: 'error',
      summary:
        "Please choose audits that haven't had any reviewer actions taken.",
      detail: '',
      life: 6000,
    });
  }
  }

  getChangeTrackerForRowDetail(audit: BranchFinancialAudit) {
    this.getFileUrls(audit);
    this.getUnseenRemarks(audit)
    this.row_detail_change_tracker = [];
    if (this.getAuditorEditHistory(audit?.id, false).length) {
      this.edit_history_table_tracker = this.getAuditorEditHistory(
        audit?.id,
        false
      )[0];
      this.edit_history_table_tracker.role = 'AUDITOR';
      this.row_detail_change_tracker.push(this.edit_history_table_tracker);
      this.edit_history_table_tracker = {};
    }
    if (this.getApproverEditHistory(audit?.id, false).length) {
      this.edit_history_table_tracker = this.getApproverEditHistory(
        audit?.id,
        false
      )[0];
      this.edit_history_table_tracker.role = 'APPROVER';
      this.row_detail_change_tracker.push(this.edit_history_table_tracker);
      this.edit_history_table_tracker = {};
    }
    if (this.getReviewerEditHistory(audit?.id, false)) {
      this.edit_history_table_tracker = this.getReviewerEditHistory(
        audit?.id,
        false
      )[0];
      this.edit_history_table_tracker.role = 'REVIEWER';
      this.row_detail_change_tracker.push(this.edit_history_table_tracker);
      this.edit_history_table_tracker = {};
    }
    console.log(this.row_detail_change_tracker);
  }

  getAuditorEditHistory(
    id: any,
    openDialog: Boolean
  ): ChangeTrackerBranchAudit[] {
    let auditor_id = this.storageService.getUser().id;
    this.edit_history_table_tracker_list = [];
    this.audit_edit_history = this.audits.filter((audit) => audit.id == id);
    this.auditor_change_tracker =
      this.audit_edit_history[0].change_tracker_branch_audit.filter(
        (change) => change.changer?.id == auditor_id
      );
    this.edit_history_table_tracker_list = this.auditor_change_tracker;
    if (openDialog) {
      this.editHistoryDialog = true;
    }
    return this.auditor_change_tracker;
  }

  getReviewerEditHistory(
    id: any,
    openDialog: Boolean
  ): ChangeTrackerBranchAudit[] {
    this.edit_history_table_tracker_list = [];
    this.audit_edit_history = this.audits.filter((audit) => audit.id == id);
    this.reviewer_change_tracker =
      this.audit_edit_history[0].change_tracker_branch_audit.filter(
        (change) =>
          change.changer?.id == this.audit_edit_history[0].reviewer?.id
      );
    this.edit_history_table_tracker_list = this.reviewer_change_tracker;
    if (openDialog) {
      this.editHistoryDialog = true;
    }
    return this.reviewer_change_tracker;
  }

  getApproverEditHistory(
    id: any,
    openDialog: Boolean
  ): ChangeTrackerBranchAudit[] {
    this.edit_history_table_tracker_list = [];
    this.audit_edit_history = this.audits.filter((audit) => audit.id == id);
    this.approver_change_tracker =
      this.audit_edit_history[0].change_tracker_branch_audit.filter(
        (change) =>
          change.changer?.id == this.audit_edit_history[0].approver?.id
      );
    this.edit_history_table_tracker_list = this.approver_change_tracker;
    if (openDialog) {
      this.editHistoryDialog = true;
    }
    return this.approver_change_tracker;
  }

  getFileUrls(audit: BranchFinancialAudit) {
    if (audit.file_urls) {
      this.fileInfos = this.fileService.getFilesByFileName(audit.file_urls);
    }
  }

  rectifyLongOutstandingItems(audit: BranchFinancialAudit) {
    this.audit_rectification = audit;
    this.audits_rectification.push(this.audit_rectification);
    this.confirmationService.confirm({
      message: 'Are you sure you want to rectify ' + audit.case_number + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.auditeeResponseService
          .rectify_auditee_response(this.audits_rectification)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter((val) => val.id !== audit.id);
              this.audit = new BranchFinancialAudit();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Long Outstanding Items rectified',
                life: 3000,
              });
            },
            error: (error: HttpErrorResponse) => {
              this.loading = false;
              this.errorMessage = error.message;
              this.submitted = true;
              this.messageService.add({
                severity: 'error',
                summary:
                  error.status == 401
                    ? 'You are not permitted to perform this action!'
                    : 'Something went wrong while rectifiying long outstanding items!',
                detail: '',
              });
            },
          });
      },
    });
  }


  addAuditeeResponse(audit: BranchFinancialAudit) {
    this.audit = audit;
    this.outputBranchFinancialAudit.push(this.audit);
    this.auditeeResponseDialog = true;
  }

  backPassedLongOutstandingItems(audit: BranchFinancialAudit) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to back ' + audit.case_number + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cashcountservice
          .backPassedCashCount(audit.long_outstanding?.branch_audit_id)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter((val) => val.id !== audit.id);
              this.audit = new BranchFinancialAudit();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Long Outstanding Items returned to drafting status',
                life: 3000,
              });
            },
            error: (error: HttpErrorResponse) => {
              this.loading = false;
              this.errorMessage = error.message;
              this.submitted = true;
              this.messageService.add({
                severity: 'error',
                summary:
                  error.status == 401
                    ? 'You are not permitted to perform this action!'
                    : 'Something went wrong while returning long outstanding items to the drafting status!',
                detail: '',
              });
            },
          });
      },
    });
  }

  openRemarkModal(audit: BranchFinancialAudit) {
    this.audit_remark = { ...audit };
    this.auditRemarkDialog = true;
  }

  getUnseenRemarks(audit: BranchFinancialAudit) {
    this.unseenRemark.branchFinancialAudit = audit;
    this.currentUser.id = this.storageService.getUser().id;
    this.unseenRemark.reciever = this.currentUser;
    this.remarkService.getUnseenRemarks(this.unseenRemark).subscribe({
      next: (res) => {
        this.unseen_remark = res.length;
        console.log(this.unseen_remark);
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong ',
          life: 3000,
        });
      },
    });
  }



}

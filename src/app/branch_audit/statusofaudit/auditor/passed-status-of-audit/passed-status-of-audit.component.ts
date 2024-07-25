import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
import { PassedStatusOfAuditServiceService } from './passed-status-of-audit-service.service';

@Component({
  selector: 'app-passed-status-of-audit',
  templateUrl: './passed-status-of-audit.component.html',
  styleUrls: ['./passed-status-of-audit.component.css']
})
export class PassedStatusOfAuditComponent implements OnInit {
  environment = environment;
  public Editor = ClassicEditor;
  auditor_id!:any;
  audits: BranchFinancialAudit[];
  loading:boolean=true;
  selectedstatusofAudits: BranchFinancialAudit[] = [];
  errorMessage: String = '';
  submitted: boolean = false;
  audit = new BranchFinancialAudit();
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
  audit_remark = new BranchFinancialAudit();
  auditRemarkDialog = false;
  auditEditDialog: boolean;
  change_tracker_branch_audit: ChangeTrackerBranchAudit[] = [];
  unseenRemark = new RemarkBranchAudit();
  currentUser = new User();
  unseen_remark = 0;

  constructor(
    private service:PassedStatusOfAuditServiceService,
    private storageService: StorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private remarkService: RemarkBranchAuditService,
    private fileService: BranchFinancialAuditService,
  ) {}

  ngOnInit() {
    this.auditor_id=this.storageService.getUser().id;
    this.getPassedStatusOfAudit();
  }


  getPassedStatusOfAudit() {
    this.service.getPassedStatusOfAudit(this.auditor_id).subscribe(
      (response) => {
        this.audits = response;
        console.log(response);
        this.loading=false;
      },
      (error) => (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while fetching passed Back Logss!',
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

backSelectedStatusOfAudits() {
  this.selectedstatusofAudits = this.selectedstatusofAudits.filter(
    (audit) => audit.review_status === 0);
  if (this.selectedstatusofAudits.length > 0) {
  this.confirmationService.confirm({
    message: 'Are you sure you want to back the selected audits?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.service.backSelectedStatusOfdAudits(this.selectedstatusofAudits).subscribe({
        next: (response) => {
          console.log(this.selectedstatusofAudits);
          this.audits = this.audits.filter((val) => !this.selectedstatusofAudits.includes(val));
          this.selectedstatusofAudits = [];
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Audits Deleted',
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
                : 'Something went wrong while deleting finding!',
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


backStatusOfAudit(audit: BranchFinancialAudit) {
  this.confirmationService.confirm({
    message: 'Are you sure you want to pass ' + audit.case_number + ' to auditor?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.service.backStatusOfAudit(audit.statusofAudit?.branch_audit_id).subscribe({
        next: (response) => {
          console.log(audit.statusofAudit?.branch_audit_id);
          this.audits = this.audits.filter((val) => val.id !== audit.id);
          this.audit = new BranchFinancialAudit();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Audit passed to auditor',
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
                : 'Something went wrong while passing finding to the reviewer!',
            detail: '',
          });
        },
      });
    },
  });
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

openRemarkModal(audit: BranchFinancialAudit) {
  this.audit_remark = { ...audit };
  this.auditRemarkDialog = true;
}

getFileUrls(audit: BranchFinancialAudit) {
  if (audit.file_urls) {
    this.fileInfos = this.fileService.getFilesByFileName(audit.file_urls);
  }
}

hideDialog() {
  this.auditEditDialog = false;
  this.editHistoryDialog=false;
  this.submitted = false;
}

getChangeTrackerForRowDetail(audit: BranchFinancialAudit) {
  this.getFileUrls(audit);
  this.getUnseenRemarks(audit);
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

}

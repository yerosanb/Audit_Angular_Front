import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { CommonReviewerBranchFinancialService } from 'app/branch_audit/regional_compiled_audits/service/common-reviewer-branch-financial.service';
import { RemarkBranchAuditService } from 'app/branch_audit/services/remark-branch-audit.service';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment.prod';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { StatusofauditreviewService } from './statusofauditreview.service';
import { Branches } from 'app/models/admin/branches';
import { Region } from 'app/models/admin/region';

@Component({
  selector: 'app-statusofauditreview',
  templateUrl: './statusofauditreview.component.html',
  styleUrls: ['./statusofauditreview.component.css'],
})
export class StatusofauditreviewComponent implements OnInit {
  environment = environment;
  public Editor = ClassicEditor;
  selectedstatusofAudits: BranchFinancialAudit[] = [];
  loading: boolean = true;
  audits: BranchFinancialAudit[];
  audit = new BranchFinancialAudit();
  region_id = 0;
  reviewer: User = new User();
  submitted = false;
  errorMessage: String = '';
  activeIndex1: number = 0;
  unseen_remark = 0;
  audit_remark = new BranchFinancialAudit();
  auditRemarkDialog = false;
  activeState: boolean[] = [true, false, false];
  fileInfos: Observable<any>;
  row_detail_change_tracker: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker = new ChangeTrackerBranchAudit();
  unseenRemarkBranchAudit = new RemarkBranchAudit();
  currentUser = new User();
  edit_history_table_tracker_list: ChangeTrackerBranchAudit[] = [];
  audit_edit_history: BranchFinancialAudit[];
  auditor_change_tracker: ChangeTrackerBranchAudit[] = [];
  editHistoryDialog: boolean;
  reviewer_change_tracker: ChangeTrackerBranchAudit[] = [];
  approver_change_tracker: ChangeTrackerBranchAudit[] = [];

  user_type = new User();

  region = new Region();
  branch = new Branches();

  constructor(
    private service: StatusofauditreviewService,
    private commonService: CommonReviewerBranchFinancialService,
    private storageService: StorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private remarkService: RemarkBranchAuditService
  ) {}

  ngOnInit(): void {
    // this.region_id = this.storageService.getUser().region.id;
    this.reviewer.id = this.storageService.getUser().id;

    const userData = this.storageService.getUser();
    this.user_type.banking = userData.banking;
    if (userData.region) {
      this.region.id = userData.region.id;
      this.user_type.region = this.region;
    }
    if (userData.branch) {
      this.branch.id = userData.branch.id;
      this.user_type.branch = this.branch;
    }
    this.getPendingStatusOfAudit(this.user_type);
  }

  getPendingStatusOfAudit(user_type?: any) {
    this.service.getPendingStatusOfAudit(user_type).subscribe(
      (response) => {
        this.audits = response;
        this.loading = false;
      },
      (error) => (error: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while fetching Back Logs',
          detail: '',
        });
      }
    );
  }

  clear(table: Table) {
    table.clear();
  }

  reviewSelectedStatusOfAudit() {
    this.reviewer.id = this.storageService.getUser().id;
    this.selectedstatusofAudits[0].reviewer = this.reviewer;
    this.confirmationService.confirm({
      message: 'Are you sure you want to Review audits ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonService
          .reviewMultiAuditfinding(this.selectedstatusofAudits)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter(
                (val) => !this.selectedstatusofAudits.includes(val)
              );
              this.selectedstatusofAudits = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audits Reviewed',
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
                    : 'Something went wrong while reviewing status of finding!',
                detail: '',
              });
            },
          });
      },
    });
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  reviewStatusOfAudit(selected_audit: BranchFinancialAudit) {
    this.reviewer.id = this.storageService.getUser().id;
    selected_audit.id = selected_audit.id;
    selected_audit.reviewer = this.reviewer;
    this.confirmationService.confirm({
      message: 'Are you sure you want to review audit ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonService.reviewFindings(selected_audit).subscribe({
          next: (response) => {
            this.audits = this.audits.filter(
              (val) => val.id !== selected_audit.id
            );
            this.audit = new BranchFinancialAudit();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Audit Reviewed',
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
                  : 'Something went wrong while reviewing Back Logs!',
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

  getUnseenRemarkBranchAudits(audit: BranchFinancialAudit) {
    this.unseenRemarkBranchAudit.branchFinancialAudit = audit;
    this.currentUser.id = this.storageService.getUser().id;
    this.unseenRemarkBranchAudit.reciever = this.currentUser;
    this.remarkService
      .getUnseenRemarks(this.unseenRemarkBranchAudit)
      .subscribe({
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

  getChangeTrackerForRowDetail(audit: BranchFinancialAudit) {
    this.getUnseenRemarkBranchAudits(audit);
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
    this.edit_history_table_tracker_list = [];
    this.audit_edit_history = this.audits.filter((audit) => audit.id == id);
    this.auditor_change_tracker =
      this.audit_edit_history[0].change_tracker_branch_audit.filter(
        (change) => change.changer?.id == this.audit_edit_history[0].auditor?.id
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
    let reviewer_id = this.storageService.getUser().id;
    this.audit_edit_history = this.audits.filter((audit) => audit.id == id);
    this.reviewer_change_tracker =
      this.audit_edit_history[0].change_tracker_branch_audit.filter(
        (change) => change.changer?.id == reviewer_id
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

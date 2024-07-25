import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { ChangeTrackerBranchAudit } from 'app/branch_audit/model/change-tracker-branch-audit';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { Branches } from 'app/models/admin/branches';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { environment } from 'environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { GeneralObservationBranchService } from './../Serivces/general-observation-branch.service';

@Component({
  selector: 'app-general-observation-drafting-branch',
  templateUrl: './general-observation-drafting-branch.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .audit-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }

      :host ::ng-deep .row_detail .ck-editor {
        width: 95%;
      }
      :host ::ng-deep .table_editor .ck-editor {
        width: 95%;
      }
    `,
  ],
  styleUrls: ['./general-observation-drafting-branch.component.css'],
})
export class GeneralObservationDraftingBranchComponent {
  environment = environment;
  auditEditDialog: boolean;
  submitted: boolean;
  activeState: boolean[] = [true, false, false];
  activeIndex1: number = 0;
  generalObservation = new BranchFinancialAudit();
  generalObservations: BranchFinancialAudit[];
  selectedAudits: BranchFinancialAudit[] = [];
  audit_edit_history: BranchFinancialAudit[];
  errorMessage: String = '';
  loading = true;
  editHistoryDialog: boolean;
  changer = new User();
  category = '';
  user_type = new User();
  auditor = new User();
  row_detail_change_tracker: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker_list: ChangeTrackerBranchAudit[] = [];
  edit_history_table_tracker = new ChangeTrackerBranchAudit();
  auditor_change_tracker: ChangeTrackerBranchAudit[] = [];
  reviewer_change_tracker: ChangeTrackerBranchAudit[] = [];
  approver_change_tracker: ChangeTrackerBranchAudit[] = [];
  edit_auditee: Boolean = false;
  auditees: Branches[] = [];
  outputAudit: any[] = [];
  isEditData = false;
  audit = new BranchFinancialAudit();
  // audits: BranchFinancialAudit[];
  public Editor = ClassicEditor;
  fileInfos: Observable<any>;

  constructor(
    private storageService: StorageService,
    private obserervationService: GeneralObservationBranchService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fileService: BranchFinancialAuditService
  ) {}
  ngOnInit() {
    let auditor_id = this.storageService.getUser().id;
    this.category = this.storageService.getUser().category;
    this.getGeneralObservationAndComment(auditor_id);
  }

  deleteSelectedGeneralObservationAudits() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected audits?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.obserervationService
          .deleteSelectedGeneralObservationAudits(this.selectedAudits)
          .subscribe({
            next: (response) => {
              this.generalObservations = this.generalObservations.filter(
                (val) => !this.selectedAudits.includes(val)
              );
              this.selectedAudits = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Selected Audits Deleted',
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
  }
  passSelectedGeneralObservationAudits() {
    this.user_type.id = this.storageService.getUser().id;
    this.selectedAudits[0].approver = this.user_type;

    this.confirmationService.confirm({
      message: 'Are you sure you want to pass the selected audits to reviewer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.obserervationService
          .passSelectedGeneralObservationAudits(this.selectedAudits)
          .subscribe({
            next: (response) => {
              this.generalObservations = this.generalObservations.filter(
                (val) => !this.selectedAudits.includes(val)
              );
              this.selectedAudits = [];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audits passed to reviewer',
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
                    : 'Something went wrong while passing findings to the reviewer!',
                detail: '',
              });
            },
          });
      },
    });
  }

  getGeneralObservationAndComment(auditor_id: number) {
    this.obserervationService
      .getDraftedGeneralObservationAndComment(auditor_id)
      .subscribe(
        (response) => {
          this.generalObservations = response;
          this.loading = false;
          console.log(this.obserervationService);
        },
        (error) => (error: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary:
              error.status == 401
                ? 'You are not permitted to perform this action!'
                : 'Something went wrong while fetching findings!',
            detail: '',
          });
        }
      );
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  getFileUrls(audit: BranchFinancialAudit) {
    if (audit.file_urls) {
      this.fileInfos = this.fileService.getFilesByFileName(audit.file_urls);
    }
  }

  deleteGeneralObservationAudit(generalObservation: BranchFinancialAudit) {
    //console.log(generalObservation.case_number);
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' +
        generalObservation.case_number +
        '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.obserervationService
          .deleteGeneralObservationAudit(generalObservation)
          .subscribe({
            next: (response) => {
              this.generalObservations = this.generalObservations.filter(
                (val) => val.id !== generalObservation.id
              );
              this.generalObservation = new BranchFinancialAudit();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audit Deleted',
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
  }
  passGeneralObservationAudit(generalObservation: BranchFinancialAudit) {
    this.user_type.id = this.storageService.getUser().id;
    this.changer.id = this.storageService.getUser().id;
    this.generalObservation.editor = this.changer;
    this.generalObservation.category = this.storageService.getUser().category;
    generalObservation.auditor = this.user_type;

    this.confirmationService.confirm({
      message:
        'Are you sure you want to pass ' +
        generalObservation.case_number +
        ' to reviewer?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.obserervationService
          .passGeneralObservationAudit(generalObservation)
          .subscribe({
            next: (response) => {
              this.generalObservations = this.generalObservations.filter(
                (val) => val.id !== generalObservation.id
              );
              this.generalObservation = new BranchFinancialAudit();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Audit passed to reviewer',
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

  getReviewerEditHistory(
    id: any,
    openDialog: Boolean
  ): ChangeTrackerBranchAudit[] {
    this.edit_history_table_tracker_list = [];
    this.audit_edit_history = this.generalObservations.filter(
      (generalObservation) => generalObservation.id == id
    );
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
    this.audit_edit_history = this.generalObservations.filter(
      (audit) => audit.id == id
    );
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

  getAuditorEditHistory(
    id: any,
    openDialog: Boolean
  ): ChangeTrackerBranchAudit[] {
    let auditor_id = this.storageService.getUser().id;

    this.edit_history_table_tracker_list = [];
    this.audit_edit_history = this.generalObservations.filter(
      (audit) => audit.id == id
    );
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

  getChangeTrackerForRowDetail(generalObservation: BranchFinancialAudit) {
    //  this.getFileUrls(audit);
    this.row_detail_change_tracker = [];
    if (this.getAuditorEditHistory(generalObservation?.id, false).length) {
      this.edit_history_table_tracker = this.getAuditorEditHistory(
        generalObservation?.id,
        false
      )[0];
      this.edit_history_table_tracker.role = 'AUDITOR';
      this.row_detail_change_tracker.push(this.edit_history_table_tracker);
      this.edit_history_table_tracker = {};
    }
    if (this.getApproverEditHistory(generalObservation?.id, false).length) {
      this.edit_history_table_tracker = this.getApproverEditHistory(
        generalObservation?.id,
        false
      )[0];
      this.edit_history_table_tracker.role = 'APPROVER';
      this.row_detail_change_tracker.push(this.edit_history_table_tracker);
      this.edit_history_table_tracker = {};
    }
    if (this.getReviewerEditHistory(generalObservation?.id, false)) {
      this.edit_history_table_tracker = this.getReviewerEditHistory(
        generalObservation?.id,
        false
      )[0];
      this.edit_history_table_tracker.role = 'REVIEWER';
      this.row_detail_change_tracker.push(this.edit_history_table_tracker);
      this.edit_history_table_tracker = {};
    }
    console.log(this.row_detail_change_tracker);
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.generalObservations.length; i++) {
      if (this.generalObservations[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  hideDialog() {
    this.auditEditDialog = false;
    this.submitted = false;
  }

  openNew() {
    this.outputAudit = [];
    this.audit = new BranchFinancialAudit();
    this.isEditData = true;
    this.outputAudit.push(this.audit);
    this.outputAudit.push(this.isEditData);
    this.auditEditDialog = true;
  }

  editAudit(audit: BranchFinancialAudit) {
    this.outputAudit = [];
    this.isEditData = false;
    this.outputAudit.push(audit);
    this.outputAudit.push(this.isEditData);
    this.auditEditDialog = true;
  }

  onDataLoad(data: any) {
    try {
      if (data[1]) {
        let auditor_id = this.storageService.getUser().id;
        this.getGeneralObservationAndComment(auditor_id);
        this.generalObservations = [...this.generalObservations];
        this.auditEditDialog = false;
        this.audit = new BranchFinancialAudit();
      } else {
        this.auditEditDialog = false;
        this.generalObservations[this.findIndexById(data[0].id)] = data[0];
      }
      this.auditEditDialog = false;
    } catch (error) {
      console.log(error);
    }
  }
}

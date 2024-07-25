import { Component, OnInit } from '@angular/core';
import { StatusofauditunreviewService } from './statusofauditunreview.service';
import { StorageService } from 'app/services/shared/storage.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';
import { User } from 'app/models/admin/user';
import { CommonReviewerBranchFinancialService } from 'app/branch_audit/regional_compiled_audits/service/common-reviewer-branch-financial.service';

@Component({
  selector: 'app-statusofauditunreview',
  templateUrl: './statusofauditunreview.component.html',
  styleUrls: ['./statusofauditunreview.component.css'],
})
export class StatusofauditunreviewComponent implements OnInit {
  selectedStatusOfdAudits: BranchFinancialAudit[] = [];
  submitted = false;
  errorMessage: String = '';
  loading: boolean = true;
  audits: BranchFinancialAudit[] = [];
  audit = new BranchFinancialAudit();
  userId!: any;
  reviewer: User = new User();
  audit_review: BranchFinancialAudit = new BranchFinancialAudit();

  outputData: any[] = [];
  compile_ui = false;
  category = '';
  _selectedColumns: any[];

  threshold_date = new Date();
  today = new Date();
  threshold_ui = false;

  constructor(
    private service: StatusofauditunreviewService,
    private storageService: StorageService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private commonService: CommonReviewerBranchFinancialService
  ) {}

  ngOnInit(): void {
    let user = this.storageService.getUser();
    this.userId = user.id;
    this.getReviewedStatusOfAudit();
  }

  getReviewedStatusOfAudit() {
    this.service.getReviewedStatusOfAudit(this.userId).subscribe(
      (response) => {
        this.audits = response;
        //console.log(this.audits);
        this.loading = false;
      },
      (error) => (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message;
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while fetching Back Logs!',
          detail: '',
        });
      }
    );
  }

  clear(table: Table) {
    table.clear();
  }

  unReviewSelectedStatusOfAudit() {
    this.reviewer.id = this.storageService.getUser().id;
    this.selectedStatusOfdAudits[0].reviewer = this.reviewer;
    this.confirmationService.confirm({
      message: 'Are you sure you want to Unreview audits ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonService
          .unReviewMultiAuditfinding(this.selectedStatusOfdAudits)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter(
                (val) => !this.selectedStatusOfdAudits.includes(val)
              );
              this.selectedStatusOfdAudits = [];
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
                    : 'Something went wrong while unreviewing finding!',
                detail: '',
              });
            },
          });
      },
    });
  }

  unReviewStatusOfAudit(selected: BranchFinancialAudit) {
    this.reviewer.id = this.storageService.getUser().id;
    this.audit_review.id = selected.id;
    this.audit_review.reviewer = this.reviewer;
    this.confirmationService.confirm({
      message: 'Are you sure you want to Unreview audits ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonService.unReviewAuditFindings(this.audit_review).subscribe({
          next: (response) => {
            this.audits = this.audits.filter((val) => val.id !== selected.id);
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
                  : 'Something went wrong while reviewing finding!',
              detail: '',
            });
          },
        });
      },
    });
  }

  openThresholdDialog() {
    this.threshold_ui = true;
  }

  compileAudits() {
    let startdate = new Date(this.threshold_date); // your start date
    let filteredAudits = this.selectedStatusOfdAudits.filter((audit) => {
      let finding_date = new Date();
      if (audit.finding_date) {
        finding_date = new Date(audit.finding_date as string);
      }
      return finding_date > startdate;
    });

    if (filteredAudits) {
      if (filteredAudits.length) {
        this.threshold_ui = false;
        this.confirmationService.confirm({
          message:
            'Are you sure you want to compile ' +
            filteredAudits.length +
            ' audits ?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.outputData.push(filteredAudits);
            this.outputData.push('StatusOfAudit');
            this.compile_ui = true;
          },
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Please choose a lower threshold date to filter the audits.',
          detail: '',
        });
      }
    }
  }

  onDataInput(data: BranchFinancialAudit[]) {
    if (data) {
      this.compile_ui = false;
      this.audits = this.audits.filter((val) => !data.includes(val));
    }
  }
}

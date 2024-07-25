import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { RemarkBranchAuditService } from 'app/branch_audit/services/remark-branch-audit.service';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { StatusofauditbranchmanagerService } from '../statusofauditbranchmanager.service';

@Component({
  selector: 'app-statusofauditpendingbm',
  templateUrl: './statusofauditpendingbm.component.html',
  styleUrls: ['./statusofauditpendingbm.component.css']
})
export class StatusofauditpendingbmComponent implements OnInit {
  public Editor = ClassicEditor;
  loading = true;
  audits: BranchFinancialAudit[] = [];
  selectedstatusofAudits: BranchFinancialAudit[] = [];
  category='';
  fileInfos: Observable<any>;
  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];
  unseen_remark = 0;
  audit_remark = new BranchFinancialAudit();
  auditRemarkDialog = false;
  unseenRemark = new RemarkBranchAudit();
  currentUser = new User();

  constructor(
    private storageService: StorageService,
    private service:StatusofauditbranchmanagerService,
    private messageService: MessageService,
    private fileService: BranchFinancialAuditService,
    private remarkService: RemarkBranchAuditService,
  ) {}
  ngOnInit(): void {
    let user = this.storageService.getUser();
    this.category = this.storageService.getUser().category;
    this.getFindings(user.branch.id);
  }

  clear(table: Table) {
    table.clear();
  }

  getFindings(branch_audit: any) {
    this.service.getPendingAudits(branch_audit).subscribe(
      (response) => {
        this.audits = response;
        this.loading = false;
        //console.log(this.audits);
      },
      (error) => (error: HttpErrorResponse) => {
        this.loading = false;
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

  getFileUrls(audit: BranchFinancialAudit) {
    this.getUnseenRemarks(audit);
    if (audit.file_urls) {
      this.fileInfos = this.fileService.getFilesByFileName(audit.file_urls);
    }
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
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

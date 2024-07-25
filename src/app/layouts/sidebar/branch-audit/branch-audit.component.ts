import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { RemarkBranchAuditService } from 'app/branch_audit/services/remark-branch-audit.service';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-branch-audit',
  templateUrl: './branch-audit.component.html',
  styleUrls: ['./branch-audit.component.css'],
})
export class BranchAuditComponent {
  isLoggedIn = false;
  private roles: string[] = [];
  approver = false;
  reviewer = false;
  compiler = false;
  auditor = false;
  contentLoaded = false;
  category = '';
  branch_manger = false;
  regional_d = false;

  unseenRemark = new RemarkBranchAudit();
  currentUser = new User();
  unseen_remark = 0;

  constructor(
    private storageService: StorageService,
    public _router: Router,
    private remarkService: RemarkBranchAuditService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 4000);

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.category = user.category;
      this.roles = user.roles;
      this.approver = this.roles.includes('ROLE_APPROVER_BFA');
      this.reviewer = this.roles.includes('ROLE_REVIEWER_BFA');
      this.auditor = this.roles.includes('ROLE_AUDITOR_BFA');
      this.compiler = this.roles.includes('ROLE_COMPILER_BFA');
      this.branch_manger = this.roles.includes('ROLE_BRANCHM_BFA');
      this.regional_d = this.roles.includes('ROLE_REGIONALD_BFA');
      this.getUnseenRemarks()
    }
  }

  getUnseenRemarks() {
    this.currentUser.id = this.storageService.getUser().id;
    this.unseenRemark.reciever = this.currentUser;
    this.remarkService.getAllUnseenRemarks(this.unseenRemark).subscribe({
      next: (res) => {
        this.unseen_remark = 0;
        this.unseen_remark = res.length;
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

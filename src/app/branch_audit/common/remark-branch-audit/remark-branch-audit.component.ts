import { Component, Input } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { StorageService } from 'app/services/shared/storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'app/models/admin/user';
import { UserService } from 'app/services/admin/user.service';
import { environment } from 'environments/environment';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { RemarkBranchAuditService } from 'app/branch_audit/services/remark-branch-audit.service';
@Component({
  selector: 'app-remark-branch-audit',
  templateUrl: './remark-branch-audit.component.html',
  styleUrls: ['./remark-branch-audit.component.scss']
})
export class RemarkBranchAuditComponent {
  environment = environment;
  submitted: boolean;
  audits: BranchFinancialAudit[];
  audit = new BranchFinancialAudit();
  selectedAudits: BranchFinancialAudit[] = [];

  remark_list: RemarkBranchAudit[] = [];
  auditRemarks: RemarkBranchAudit[];
  addRemark: RemarkBranchAudit = new RemarkBranchAudit();
  remark = new RemarkBranchAudit();
  seenRemark = new RemarkBranchAudit();
  remarkMessage: string = '';
  currentUser = new User();
  contacts: User[] = [];
  contacts_remark: User[] = [];


  sortOrder: number;

  sortField: string;

  sortKey: any;

  @Input() branchFinancialAudit: BranchFinancialAudit;

  remark_flag = true;

  unseen_remark = 0;

  unseenRemark = new RemarkBranchAudit();
  remark_contact: RemarkBranchAudit[] = [];
  unseenRemarks: RemarkBranchAudit[] = [];

  constructor(
    private messageService: MessageService,
    private storageService: StorageService,
    private remarkService: RemarkBranchAuditService,
    private userService: UserService
  ) {}

  ngOnInit() {
    let current_user_id = this.storageService.getUser().id;
    this.userService.getUserById(current_user_id).subscribe({
      next: (res) => {
        this.currentUser = res;
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

    if (this.branchFinancialAudit?.category) {
      this.remarkService.getUserByCategory(this.branchFinancialAudit?.category).subscribe({
        next: (data) => {
          this.contacts = data;
          this.contacts = this.contacts.filter(
            (val) => val.id !== this.currentUser.id
          );
          this.getUnseenRemarks(this.branchFinancialAudit);
        },
        error: (error: HttpErrorResponse) => {
          this.submitted = false;
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

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  // loan remark fragement
  openRemarkDialog(contact: User) {
    this.seenRemark.branchFinancialAudit = this.branchFinancialAudit;
    this.seenRemark.reciever = this.currentUser;
    this.seenRemark.sender = contact;
    this.getRemarks(this.seenRemark);
    this.addRemark.reciever = contact;
    if (contact?.unseen_remark) {
      if (contact.unseen_remark > 0) {
        this.remarkService.seenRemark(this.seenRemark).subscribe({
          next: (res) => {},
          error: (error: HttpErrorResponse) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                error.status == 401
                  ? 'You are not permitted to perform this action!'
                  : 'Something went wrong!',
              life: 3000,
            });
          },
        });
      }
    }
    this.remark_flag = false;
  }
  sendRemarkEventListener() {
    const now = new Date();
    let message = `<div class="conversation-entity-grouper">
                      <div class="d-flex justify-content-between">
                        <p class="small mb-1 text-muted">${now.toLocaleString()}</p>
                        <p class="small mb-1">${this.currentUser.first_name}</p>
                      </div>
                      <div class="d-flex flex-row justify-content-end mb-4 pt-1">
                        <div>
                          <p class="small p-2 me-3 mb-3 text-white rounded-3 bg-info">${
                            this.remarkMessage
                          }</p>
                        </div>
                        <img src=${
                          this.currentUser.photoUrl
                            ? this.environment.imagesUserApi +
                              this.currentUser.photoUrl
                            : environment.blankPic
                        }
                          alt="avatar 1" style="width: 45px; height: 100%;">
                      </div>
                  </div>
      `;

    let new_message_ui = document.getElementsByClassName('remark-maker');

    if (new_message_ui.length == 0) {
      let remark_container = document.getElementById('remark-container');
      let new_remark = document.createElement('div');

      new_remark.setAttribute('class', 'card-body overflow-auto remark-maker');
      new_remark.setAttribute('style', 'position: relative;');

      new_remark.innerHTML = `<div class="conversation-entity-grouper">
      <div class="d-flex justify-content-between">
        <p class="small mb-1 text-muted">${now.toLocaleString()}</p>
        <p class="small mb-1">${this.currentUser.first_name}</p>
      </div>
      <div class="d-flex flex-row justify-content-end mb-4 pt-1">
        <div>
          <p class="small p-2 me-3 mb-3 text-white rounded-3 bg-info">${
            this.remarkMessage
          }</p>
        </div>
        <img src=${
          this.currentUser.photoUrl
            ? this.environment.imagesUserApi + this.currentUser.photoUrl
            : environment.blankPic
        }
          alt="avatar 1" style="width: 45px; height: 100%;">
      </div>
  </div>`;
      remark_container?.appendChild(new_remark);
    } else {
      new_message_ui
        .item(new_message_ui.length - 1)
        ?.insertAdjacentHTML('beforeend', message);
    }

    this.addRemark.branchFinancialAudit = this.branchFinancialAudit;
    this.addRemark.sender = this.currentUser;
    this.addRemark.message = this.remarkMessage;
    this.sendRemark(this.addRemark);
    this.remarkMessage = '';
    new_message_ui.item(new_message_ui.length - 1)?.scrollIntoView();
  }

  sendRemark(remark: RemarkBranchAudit) {
    this.remarkService.addRemark(remark).subscribe({
      next: () => {},
      error: (error: HttpErrorResponse) => {
        this.submitted = false;
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

  getRemarks(remark: RemarkBranchAudit) {
    this.remarkService.getRemarks(remark).subscribe({
      next: (data) => {
        this.auditRemarks = data;
      },
      error: (error: HttpErrorResponse) => {
        this.submitted = false;
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

  getUnseenRemarks(audit: BranchFinancialAudit) {
    this.unseenRemark.branchFinancialAudit = audit;
    this.unseenRemark.reciever = this.currentUser;
    this.remarkService.getUnseenRemarks(this.unseenRemark).subscribe({
      next: (remarks) => {
        this.unseenRemarks = remarks;
        if (this.unseenRemarks) {
          for (let contact of this.contacts) {
            this.remark_contact = this.unseenRemarks.filter(
              (remark) => remark.sender?.id == contact.id
            );
            contact.unseen_remark = this.remark_contact.length;
            this.contacts_remark.push(contact);
          }
        } else {
          for (let contact of this.contacts) {
            contact.unseen_remark = this.remark_contact.length;
            this.contacts_remark.push(contact);
          }
        }
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


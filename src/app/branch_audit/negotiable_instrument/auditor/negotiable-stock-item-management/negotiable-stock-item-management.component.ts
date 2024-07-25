import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { User } from 'app/models/admin/user';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { NegotiableStockItem } from 'app/branch_audit/model/negotiable_stock_item/negotiable-stock-item';
import { environment } from 'environments/environment';
import { NegotiableStockItemService } from '../../service/negotiable-stock-item.service';

@Component({
  selector: 'app-negotiable-stock-item-management',
  templateUrl: './negotiable-stock-item-management.component.html',
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
  styleUrls: ['./negotiable-stock-item-management.component.css'],
})
export class NegotiableStockItemManagementComponent {
  environment = environment;
  public Editor = ClassicEditor;
  public findingEditor = ClassicEditor;
  public impactEditor = ClassicEditor;
  public recommendationEditor = ClassicEditor;
  auditEditDialog: boolean;
  editHistoryDialog: boolean;
  submitted: boolean;
  audits: NegotiableStockItem[] = [];
  audit = new NegotiableStockItem();
  selectedAudits: NegotiableStockItem[] = [];
  audit_edit_history: NegotiableStockItem[];
  updated = false;
  errorMessage: String = '';
  loading = true;
  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];
  events1: any[];
  cols: any[];
  exportColumns: any[];

  user_type = new User();

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private negotiableStockItemService: NegotiableStockItemService
  ) {}

  ngOnInit() {
    this.getFindings();

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'audit_type', header: 'audit_type' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  getFindings() {
    this.negotiableStockItemService.getNegotiableStockItem().subscribe(
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
              : 'Something went wrong while fetching findings!',
          detail: '',
        });
      }
    );
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  openNew() {
    this.audit = new NegotiableStockItem();
    this.submitted = false;
    this.auditEditDialog = true;
  }

  clear(table: Table) {
    table.clear();
  }

  deleteAudit(audit: NegotiableStockItem) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.negotiableStockItemService
          .deleteNegotiableStockItem(audit)
          .subscribe({
            next: (response) => {
              this.audits = this.audits.filter((val) => val.id !== audit.id);
              this.audit = new NegotiableStockItem();
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

  saveOperationalCategory() {
    // this.branch.id = this.audit.branch
    // this.audit.branch = this.branch

    this.submitted = true;
    // if (this.edit_auditee) {
    //   this.audit.auditees = this.selected_auditees;
    // }
    this.negotiableStockItemService
      .createNegotiableStockItem(this.audit)
      .subscribe({
        next: (response) => {
          if (this.audit.id) {
            this.audits[this.findIndexById(this.audit.id)] = this.audit;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Stock item updated.',
              life: 3000,
            });
            this.hideDialog();

          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Stock item created.',
              life: 3000,
            });
            this.getFindings();
            this.audits = [...this.audits];
            this.auditEditDialog = false;
            this.audit = new NegotiableStockItem();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.errorMessage = error.message;
          this.submitted = true;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              error.status == 401
                ? 'You are not permitted to perform this action!'
                : 'Something went wrong while either creating or updating negotiable stock item!',
            life: 3000,
          });
        },
      });
  }

  editAudit(audit: NegotiableStockItem) {
    this.audit = { ...audit };

    this.auditEditDialog = true;
  }

  hideDialog() {
    this.auditEditDialog = false;
    this.submitted = false;
  }

  findIndexById(id: Number): number {
    let index = -1;
    for (let i = 0; i < this.audits.length; i++) {
      if (this.audits[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  exportPdf() {
    // import('jspdf').then((jsPDF) => {
    //   import('jspdf-autotable').then((x) => {
    //     const doc = new jsPDF.default(0, 0);
    //     doc.autoTable(this.exportColumns, this.audits);
    //     doc.save('products.pdf');
    //   });
    // });
  }
}

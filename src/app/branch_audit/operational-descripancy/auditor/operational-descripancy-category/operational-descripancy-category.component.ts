
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { OperationalDescripancyCategory } from 'app/branch_audit/model/operational-descripancy/operational-descripancy-category';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { OperationalDescripancyCategoryService } from '../services/operational-descripancy-category.service';

    @Component({
      selector: 'app-operational-descripancy-category',
      templateUrl: './operational-descripancy-category.component.html',
      styles: [
        `
          :host ::ng-deep .ck-editor {
            width: 100%;
          }
        `,
      ],
      styleUrls: ['./operational-descripancy-category.component.css']
    })
    export class OperationalDescripancyCategoryComponent {
  public impactEditor = ClassicEditor;
  auditEditDialog: boolean;
  submitted: boolean;
  audits: OperationalDescripancyCategory[]=[];
  audit = new OperationalDescripancyCategory();
  selectedAudits: OperationalDescripancyCategory[] = [];
  audit_edit_history: OperationalDescripancyCategory[];
  loading = true;
  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];
  events1: any[];
  cols: any[];
  exportColumns: any[];


  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private operationalDescripancyCategoryService:OperationalDescripancyCategoryService

  ) { }

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
    this.operationalDescripancyCategoryService.getOperationalDescripancyCategory().subscribe(
      (response) => {
        this.audits = response;
        this.loading=false;
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
    this.audit = new OperationalDescripancyCategory();
    this.auditEditDialog = true;
  }


  clear(table: Table) {
    table.clear();
  }

  deleteAudit(audit: OperationalDescripancyCategory) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.operationalDescripancyCategoryService.deleteOperationalDescripancyCategory(audit).subscribe({
          next: (response) => {
            this.audits = this.audits.filter((val) => val.id !== audit.id);
            this.audit = new OperationalDescripancyCategory();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Discrepancy Deleted',
              life: 3000,
            });
          },
          error: (error: HttpErrorResponse) => {
            this.loading = false;
            this.submitted = true;
            this.messageService.add({
              severity: 'error',
              summary:
                error.status == 401
                  ? 'You are not permitted to perform this action!'
                  : 'Something went wrong while deleting discrepancy!',
              detail: '',
            });
          },
        });
      },
    });
  }


  saveOperationalCategory() {
    this.operationalDescripancyCategoryService.createOperationalDescriptionCategory(this.audit).subscribe({
      next: (response) => {
        if (this.audit.id) {
          this.audits[this.findIndexById(this.audit.id)] = this.audit;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Discrepancy Updated',
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Discrepancy Added',
            life: 3000,
          });
          this.getFindings();
          this.audits = [...this.audits];
          this.auditEditDialog = false;
          this.audit = new OperationalDescripancyCategory();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.submitted = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while either creating or updating Operational Discrepancy!',
          life: 3000,
        });
      },
    });
  }


  editAudit(audit: OperationalDescripancyCategory) {
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

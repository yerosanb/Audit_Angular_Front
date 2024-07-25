
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { User } from 'app/models/admin/user';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { OperationalDescripancyCategory } from 'app/branch_audit/model/operational-descripancy/operational-descripancy-category';
import { environment } from 'environments/environment';
import { SuspenseAccountTypeService } from '../service/suspense-account-type.service';
  
    
    @Component({
      selector: 'app-suspense-account-type-management',
      templateUrl: './suspense-account-type-management.component.html',
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
      styleUrls: ['./suspense-account-type-management.component.css']
    })
    export class SuspenseAccountTypeManagementComponent {
        
  environment = environment;
  public Editor = ClassicEditor;
  public findingEditor = ClassicEditor;
  public impactEditor = ClassicEditor;
  public recommendationEditor = ClassicEditor;
  auditEditDialog: boolean;
  editHistoryDialog: boolean;

  submitted: boolean;

  audits: OperationalDescripancyCategory[]=[];
  audit = new OperationalDescripancyCategory();
  selectedAudits: OperationalDescripancyCategory[] = [];
  audit_edit_history: OperationalDescripancyCategory[];
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
    private suspenseAccountTypeService:SuspenseAccountTypeService

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
    this.suspenseAccountTypeService.getSuspenseAccountType().subscribe(
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
    this.audit = new OperationalDescripancyCategory();
    this.submitted = false;
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
        this.suspenseAccountTypeService.deleteSuspenseAccountType(audit).subscribe({
          next: (response) => {
            this.audits = this.audits.filter((val) => val.id !== audit.id);
            this.audit = new OperationalDescripancyCategory();
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
  

  // getFileUrls(audit: OperationalDescripancyCategory) {
  //   if (audit?.is_MGTAuditee) {
  //     if (audit?.is_MGTAuditee[0].auditeeDivisionISM)
  //       this.uploaded_files =
  //         audit?.is_MGTAuditee[0]?.auditeeDivisionISM[0]?.uploaded_files?.map(
  //           (AuditeeDivisionFileIsm) => AuditeeDivisionFileIsm.file_url
  //         ) as any;
  //   }
  //   this.fileInfos = this.auditeeISMService.getFilesByFileName(
  //     this.uploaded_files
  //   );
  // }

  

  saveOperationalCategory() {
    // this.branch.id = this.audit.branch
    // this.audit.branch = this.branch

    this.submitted = true;
    // if (this.edit_auditee) {
    //   this.audit.auditees = this.selected_auditees;
    // }
    this.suspenseAccountTypeService.createSuspenseAccountType(this.audit).subscribe({
      next: (response) => {
        if (this.audit.id) {
          this.audits[this.findIndexById(this.audit.id)] = this.audit;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Audit Updated',
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Audit Created',
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
        this.errorMessage = error.message;
        this.submitted = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while either creating or updating Operational Category!',
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
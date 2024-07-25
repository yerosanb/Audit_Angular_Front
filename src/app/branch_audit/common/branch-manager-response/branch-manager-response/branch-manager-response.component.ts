import {
  HttpErrorResponse,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { StorageService } from 'app/services/shared/storage.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { BranchManagerResponseService } from '../../service/branch-manager-response.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-branch-manager-response',
  templateUrl: './branch-manager-response.component.html',
  styleUrls: ['./branch-manager-response.component.css'],
  providers: [MessageService],
})
export class BranchManagerResponseComponent implements OnInit {
  public Editor = ClassicEditor;
  loading = true;
  submitted = false;
  errorMessage = '';
  maxFileSize: Number = 1000000;
  uploadedFiles: any[] = [];
  fileInfos: Observable<any>;
  file_urls: String[] = [];

  message = '';
  progress = 0;

  @Input() passedBranchFinancialAudit: BranchFinancialAudit[];
  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  branchFinancialAudit: BranchFinancialAudit[];

  attached_files: String[] = [];

  file_flag = false;

  isLoggedIn = false;
  private roles: string[] = [];
  auditor = false;

  constructor(
    private messageService: MessageService,
    private branchManagerResponseService: BranchManagerResponseService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.branchFinancialAudit = this.passedBranchFinancialAudit;
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.auditor = this.roles.includes('ROLE_AUDITOR_BFA');
    }
    this.getFileUrls(this.branchFinancialAudit[0]);
  }

  emitData(data: BranchFinancialAudit[]) {
    this.dataChange.emit(data);
  }

  getFileUrls(audit: BranchFinancialAudit) {
    if (audit.bmFileUrls) {
      this.attached_files = audit.bmFileUrls;
      this.fileInfos = this.branchManagerResponseService.getFilesByFileName(
        audit.bmFileUrls
      );
    }
  }

  onUpload(event: UploadEvent) {
    let file_urls: String[] = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.message = '';
      this.branchManagerResponseService.upload(file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            file_urls.push(file.name);
            this.file_urls = file_urls;
            this.message = event.body.message;
            this.messageService.add({
              severity: 'info',
              summary: `${this.message}`,
              detail: '',
            });
          }
        },
        error: (err: any) => {
          this.progress = 0;
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
          this.messageService.add({
            severity: 'error',
            summary: `${this.message}`,
            detail:
              'Check either the file size, file name, or network connection',
            sticky: true,
          });
        },
      });
    }
  }

  addAuditeeResponse(): void {
    this.loading = true;
    this.branchFinancialAudit[0].bmFileUrls = this.file_urls;
    this.branchFinancialAudit[0].file_flag = this.file_flag;

    let index;
    let date_of_response: any;
    date_of_response = new Date();
    for (index = 0; index < this.branchFinancialAudit.length; index++) {
      this.branchFinancialAudit[index].response_added = 1;

      this.branchFinancialAudit[index].responded_date = date_of_response;
    }

    this.branchManagerResponseService
      .add_response(this.branchFinancialAudit)
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          this.submitted = true;
          this.errorMessage = '';
          this.message = 'Response successfully added';
          this.messageService.add({
            severity: 'success',
            summary: `${this.message}`,
            detail: '',
          });

          this.emitData(this.branchFinancialAudit);
          // this.closeModal();
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.submitted = false;
          this.errorMessage = error.error.message;
          this.message = this.errorMessage;
          console.log(error.message);
          this.messageService.add({
            severity: 'error',
            summary: `${this.message}`,
            detail: '',
            sticky: true,
          });
          // this.closeModal();
        },
      });
  }
}


import {
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { StorageService } from 'app/services/shared/storage.service';
import { MessageService } from 'primeng/api';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [MessageService],
})
export class FileUploadComponent implements OnInit {
  loading = true;
  submitted = false;
  errorMessage = '';
  maxFileSize: number = 10000000;
  uploadedFiles: any[] = [];
  message = '';
  progress = 0;

  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private messageService: MessageService,
    private branchFinancialAuditService: BranchFinancialAuditService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {

  }

  // Method to emit the event with data
  emitData(data: any) {
    this.dataChange.emit(data);
  }

  onUpload(event: UploadEvent) {
    let file_urls: String[] = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.message = '';
      this.branchFinancialAuditService.upload(file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            file_urls.push(file.name);
            this.message = event.body.message;
            this.messageService.add({
              severity: 'info',
              summary: `${this.message}`,
              detail: '',
            });
            this.emitData(file_urls);
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
}

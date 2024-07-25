import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'app/models/admin/user';
import { CommonFindingService } from 'app/services/shared/audit/common-finding.service';
import { StorageService } from 'app/services/shared/storage.service';
import { MessageService } from 'primeng/api';
import { CommonFinding } from '../../../models/shared/audit/common-finding';

@Component({
  selector: 'app-common-finding',
  templateUrl: './common-finding.component.html',
  styleUrls: ['./common-finding.component.css'],
})
export class CommonFindingComponent {
  commonFinding: CommonFinding = new CommonFinding();
  user: User = new User();
  audit_type: any[];

  @Input() passedFinding: any[];
  @Output() editedFinding: EventEmitter<any> = new EventEmitter();

  isEditData = false;

  loading = false;

  constructor(
    private storageService: StorageService,
    private commonFindingService: CommonFindingService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.isEditData = this.passedFinding[1];
    if (this.isEditData) {
      this.openNew();
    } else {
      this.editFinding(this.passedFinding);
    }
    this.audit_type = [
      { name: 'ATM Card', code: 'ATMCard' },
      { name: 'Incomplete Account', code: 'IncompleteAccount' },
      { name: 'Dormant/Active Account', code: 'DormantActiveAccount' },
      {
        name: 'General Observation and Comment',
        code: 'GeneralObservationAndComment',
      },
      { name: 'Back Logs', code: 'StatusOfAudit' },
      { name: 'Cash Performance', code: 'CashPerformance' },
      { name: 'Cash Management', code: 'CashManagement' },
      { name: 'Cash Count', code: 'CashCount' },
      { name: 'Deposit Account', code: 'DepositAccount' },
      { name: 'General Observation', code: 'GeneralObservation' },
      { name: 'Negotiable Instrument', code: 'NegotiableInstrument' },
      { name: 'Long outstanding Items', code: 'LongOutstandingItem' },
      { name: 'Loan and Advance', code: 'LoanAndAdvance' },
      { name: 'Asset and Liability', code: 'AssetLiability' },
      { name: 'Abnormal Balance', code: 'AbnormalBalance' },
      { name: 'Suspense Account', code: 'SuspenseAccount' },
      { name: 'Controllable Expense', code: 'ControllableExpense' },
      {
        name: 'Memorandum and Contingent Account',
        code: 'MemorandomContingent',
      },
    ];
  }

  openNew() {
    this.commonFinding = new CommonFinding();
  }
  editFinding(passedData: any[]) {
    this.commonFinding = passedData[0];
  }

  emitData(data: CommonFinding[]) {
    this.editedFinding.emit(data);
  }

  addCommonFinding(): void {
    this.loading = true;
    this.user.id = this.storageService.getUser().id;
    this.commonFinding.user = this.user;
    this.commonFindingService.addCommonFinding(this.commonFinding).subscribe({
      next: (response) => {
        if (this.commonFinding.id) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Finding Updated',
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Finding Created',
            life: 3000,
          });

          this.commonFinding = new CommonFinding();
        }
        this.passedFinding = [];
        this.passedFinding.push(this.commonFinding);
        this.passedFinding.push(this.isEditData);
        this.emitData(this.passedFinding);
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while adding finding!',
          detail: '',
        });
      },
    });
  }
}

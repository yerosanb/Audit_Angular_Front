import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'app/models/admin/user';
import { Recommendation } from 'app/services/approver/recommendation';
import { RecommendationService } from 'app/services/approver/recommendation.service';

import { StorageService } from 'app/services/shared/storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css'],
})
export class RecommendationComponent {
  recommendation: Recommendation = new Recommendation();
  user: User = new User();
  audit_type: any[];

  @Input() passedRecommendation: any[];
  @Output() editedRecommendation: EventEmitter<any> = new EventEmitter();

  isEditData = false;

  loading = false;

  constructor(
    private storageService: StorageService,
    private messageService: MessageService,
    private recommendationService: RecommendationService
  ) {}

  ngOnInit() {
    this.isEditData = this.passedRecommendation[1];
    if (this.isEditData) {
      this.openNew();
    } else {
      this.editFinding(this.passedRecommendation);
    }

    this.audit_type = [
      { name: 'ATM Card', code: 'ATMCard' },
      { name: 'Incomplete Account', code: 'IncompleteAccount' },
      { name: 'Transaction Related Findings ', code: 'OperationalDescripancy' },
      { name: 'Dormant/Active Account', code: 'DormantActiveAccount' },
      {
        name: 'General Observation and Comment',
        code: 'GeneralObservationAndComment',
      },
      { name: 'Back Logs', code: 'StatusOfAudit' },
      { name: 'Cash Count', code: 'CashCount' },
      { name: 'Cash Performance', code: 'CashPerformance' },
      { name: 'Cash Management', code: 'CashManagement' },
      { name: 'Insufficient Cheque', code: 'InsufficientCheque' },
      { name: 'Cheque Delivered Not Sign', code: 'ChequeDeliveredNotSign' },
      { name: 'General Observation', code: 'GeneralObservation' },
      { name: 'Age Of Item', code: 'AgeOfItem' },
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
    this.recommendation = new Recommendation();
  }
  editFinding(passedData: any[]) {
    this.recommendation = passedData[0];
  }

  emitData(data: Recommendation[]) {
    this.editedRecommendation.emit(data);
  }

  addCommon(): void {
    this.loading = true;
    this.user.id = this.storageService.getUser().id;
    this.recommendation.user = this.user;

    this.recommendationService.createCommon(this.recommendation).subscribe({
      next: (response) => {
        this.loading = false;
        if (this.recommendation.id) {
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

          this.recommendation = new Recommendation();
        }
        this.passedRecommendation = [];
        this.passedRecommendation.push(this.recommendation);
        this.passedRecommendation.push(this.isEditData);
        this.emitData(this.passedRecommendation);
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;

        this.messageService.add({
          severity: 'error',
          summary:
            error.status == 401
              ? 'You are not permitted to perform this action!'
              : 'Something went wrong while adding recommendation!',
          detail: '',
        });
      },
    });
  }
}

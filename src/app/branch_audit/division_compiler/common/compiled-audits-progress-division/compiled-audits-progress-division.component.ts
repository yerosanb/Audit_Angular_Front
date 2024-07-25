


import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { RemarkRegionalBranchAuditService } from 'app/branch_audit/common/remark-branch-audit/service/remark-regional-branch-audit.service';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { CompiledRegionalAudit } from 'app/branch_audit/model/compiled-regional-audit';
import { RemarkBranchAudit } from 'app/branch_audit/model/remark-branch-audit';
import { BranchFinancialAuditService } from 'app/branch_audit/services/branch-financial-audit.service';
import { DivisionCompilerForCompilingService } from 'app/branch_audit/services/division-compiler-for-compiling.service';
import { User } from 'app/models/admin/user';
import { StorageService } from 'app/services/shared/storage.service';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CompiledBranchAudit } from '../../../model/compiled-branch-audit';

@Component({
  selector: 'app-compiled-audits-progress-division',
  templateUrl: './compiled-audits-progress-division.component.html',
  styleUrls: ['./compiled-audits-progress-division.component.css']
})
export class CompiledAuditsProgressDivisionComponent {

  compiledRegionalAudits : CompiledRegionalAudit[] = []
  compiledRegionalAudit = new CompiledRegionalAudit();
  selectedAudits : CompiledRegionalAudit[] = []

  selectedCompiledBranchAudit = new CompiledBranchAudit();
  audit_type:String="";
  auditDetailDialog = false;

  compiler = new User();

  category = '';
  loading= true;

  fileInfos: Observable<any>;
  filesDialog = false;

  _selectedColumns: any[];

  cols: any[];

  activeIndex1: number = 0;
  activeState: boolean[] = [true, false, false];

  audit_remark = new CompiledRegionalAudit();
  auditRemarkDialog = false;

  unseenRemark = new RemarkBranchAudit();
  currentUser = new User();
  unseen_remark = 0;

  //ATM Card
  total_issued_card = 0;
  total_distributed_card = 0;
  total_remaining_card = 0;
  total_retarned_card = 0;

  // cash performance
  total_excess_amount = 0;
  total_shortage_amount = 0;

  total_excess_amount_fcy = 0;
  total_shortage_amount_fcy = 0;

  //cash management
  total_average_cash_holding_fcy = 0;
  total_cash_set_limit_fcy = 0;
  total_average_cash_holding_lcy = 0;
  total_cash_set_limit_lcy = 0;

  //cash count
  total_actual_cash_count_fcy = 0;
  total_trial_balance_fcy = 0;
  total_actual_cash_count_lcy = 0;
  total_trial_balance_lcy = 0;

  //incomplete account
  total_amount_withdraw_fcy = 0;
  total_amount_withdraw_lcy = 0;

  //Dormant Account
  total_amount_withdraw_dormant_fcy = 0;
  total_amount_withdraw_dormant_lcy = 0;

  //Operation Discrepancies
  total_amount_fcy = 0;
  total_amount_lcy = 0;
  // Asset and Liability
  total_asset_amount = 0;
  total_liability_amount = 0;

  total_asset_amount_fcy = 0;
  total_liability_amount_fcy = 0;

  // Abnormal balance
  total_credit_amount = 0;
  total_debit_amount = 0;

  total_credit_amount_fcy = 0;
  total_debit_amount_fcy = 0;

  //  Negotiable and Instrument

  total_amount = 0;
  total_trail_balance_amount = 0;

  // total_amount_fcy = 0;
  total_trial_balance_amount_fcy = 0;

  //   Loan and Advance
  total_approved_amount = 0;
  total_overdrawn_balance = 0;

  total_approved_amount_fcy = 0;
  total_overdrawn_balance_fcy = 0;

  //  Long outstanding Item

  trial_balance_l = 0;
  total_amount_L = 0;

  trial_balance_l_fcy = 0;
  total_amount_L_fcy = 0;

  // Suspense Account

  total_balance_per_tracer = 0;
  total_balance_per_trial_balance = 0;

  total_balance_per_tracer_fcy = 0;
  total_balance_per_trial_balance_fcy = 0;

  // Controllable Expense

  budget_per_plan = 0;
  actual_balance = 0;

  budget_per_plan_fcy = 0;
  actual_balance_fcy = 0;


  constructor(
    private compilerService: DivisionCompilerForCompilingService,
    private remarkService: RemarkRegionalBranchAuditService,
    private storageService: StorageService,
    private fileService: BranchFinancialAuditService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}
  ngOnInit(): void {
    let user = this.storageService.getUser();
    this.category = this.storageService.getUser().category;


    this.cols = [
      { field: 'case_number', header: 'Case Number' },
      // { field: 'finding', header: 'Finding' },
      // { field: 'impact', header: 'Impact' },
      // { field: 'recommendation', header: 'Recommendation' },
      { field: 'borrower_name', header: 'Borrower Name' },
      { field: 'account_number', header: 'Account Number' },
      { field: 'loan_type', header: 'Loan Type' },
      { field: 'loan_status', header: 'Loan Status' },
      { field: 'amount_granted', header: 'Amount Granted' },
      { field: 'interest_rate', header: 'Interest/Profit Rate' },
      { field: 'arrears', header: 'Arrears' },
      { field: 'loan_disbursed_date', header: 'Disbursed Date' },
      { field: 'approved_amount', header: 'Approved Amount' },
      { field: 'overdrawn_balance', header: ' Outstanding balance' },
      { field: 'difference', header: 'Difference' },
      { field: 'penalty_charge', header: 'Penality Charge' },
      { field: 'expiry_date', header: 'Expiry Date' },
    ];

    this._selectedColumns = this.cols;

    this.compilerService.getSubmittedCompiledFindings(user.id).subscribe(
      (response) => {
        this.compiledRegionalAudits = response;
        this.loading =false;
      },

      (error) => (error: HttpErrorResponse) => {
        this.loading=false;
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

  openRemarkModal(audit: CompiledRegionalAudit) {
    this.audit_remark = { ...audit };
    this.auditRemarkDialog = true;
  }

  getUnseenRemarks(audit: CompiledRegionalAudit) {
    this.unseenRemark.compiledRegionalAudit = audit;
    this.currentUser.id = this.storageService.getUser().id;
    this.unseenRemark.reciever = this.currentUser;
    this.remarkService.getUnseenRemarks(this.unseenRemark).subscribe({
      next: (res) => {
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

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }

  getFileUrls(audit: BranchFinancialAudit) {
    if(audit.file_urls)
    {
      this.fileInfos = this.fileService.getFilesByFileName(
        audit.file_urls
      );
    }
    this.filesDialog = true;
  }

  getRowDetails(audit: CompiledRegionalAudit)
  {
    this.getUnseenRemarks(audit);
  }

  openAuditDetailDialog(compiledBranchAudit: CompiledBranchAudit)
  {
    this.auditDetailDialog = true;
    this.audit_type = compiledBranchAudit.audit_type ? compiledBranchAudit.audit_type : "";
    this.selectedCompiledBranchAudit = compiledBranchAudit;
    if (this.audit_type?.includes('CashPerformance')) {
      this.computeCashPerfromance(compiledBranchAudit);
    } else if (this.audit_type?.includes('CashManagement')) {
      this.computeCashManagement(compiledBranchAudit);
    } else if (this.audit_type?.includes('CashCount')) {
      this.computeCashCount(compiledBranchAudit);
    } else if (this.audit_type?.includes('IncompleteAccount')) {
      this.computeIncompleteAccount(compiledBranchAudit);
    } else if (this.audit_type?.includes('ATMCard')) {
      this.computeAtmCard(compiledBranchAudit);
    } else if (this.audit_type?.includes('Dormant')) {
      this.computeDormantAccount(compiledBranchAudit);
    } else if (this.audit_type?.includes('OperationalDiscrepancy')) {
      this.computeOperationalDiscrepancy(compiledBranchAudit);
    } else if (this.audit_type.includes('AbnormalBalance')) {
      this.computeAbnormalBalance(compiledBranchAudit);
    } else if (this.audit_type.includes('AssetLiability')) {
      this.computeAssetLiability(compiledBranchAudit);
    } else if (this.audit_type.includes('NegotiableInstrument')) {
      this.computeNegotiable(compiledBranchAudit);
    } else if (this.audit_type.includes('ControllableExpense')) {
      this.computeControllableExpense(compiledBranchAudit);
    } else if (this.audit_type.includes('SuspenseAccount')) {
      this.computeSuspenseAccount(compiledBranchAudit);
    } else if (this.audit_type.includes('LoanAndAdvance')) {
      this.computeLoanandAdvance(compiledBranchAudit);
    } else if (this.audit_type.includes('LongOutstandingItems')) {
      this.computeLongOutstanding(compiledBranchAudit);
    } else if (this.audit_type.includes('Contigent')) {
      this.computeMemorandum(compiledBranchAudit);
    }
  }

  computeMemorandum(audit: CompiledBranchAudit) {
    this.total_asset_amount = 0;
    this.total_liability_amount = 0;
    this.total_asset_amount_fcy = 0;
    this.total_liability_amount_fcy = 0;

    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.memorandumContigent?.cash_type != 'FCY') {
        if (bfa.memorandumContigent?.contingent_amount) {
          this.total_asset_amount += bfa.memorandumContigent?.contingent_amount;
        }
        if (bfa.memorandumContigent?.memorandom_amount) {
          this.total_liability_amount +=
            bfa.memorandumContigent?.memorandom_amount;
        }
      } else {
        if (bfa.memorandumContigent?.contingent_amount) {
          this.total_asset_amount_fcy +=
            bfa.memorandumContigent?.contingent_amount;
        }
        if (bfa.memorandumContigent?.memorandom_amount) {
          this.total_liability_amount_fcy +=
            bfa.memorandumContigent?.memorandom_amount;
        }
      }
    }
  }

  computeCashPerfromance(audit: CompiledBranchAudit) {
    this.total_excess_amount = 0;
    this.total_shortage_amount = 0;
    this.total_excess_amount_fcy = 0;
    this.total_shortage_amount_fcy = 0;
    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.cashPerformanceBranch?.cash_type != 'FCY') {
        if (bfa.cashPerformanceBranch?.amount_excess) {
          this.total_excess_amount += bfa.cashPerformanceBranch?.amount_excess;
        }
        if (bfa.cashPerformanceBranch?.amount_shortage) {
          this.total_shortage_amount +=
            bfa.cashPerformanceBranch?.amount_shortage;
        }
      } else {
        if (bfa.cashPerformanceBranch?.amount_excess) {
          this.total_excess_amount_fcy +=
            bfa.cashPerformanceBranch?.amount_excess;
        }
        if (bfa.cashPerformanceBranch?.amount_shortage) {
          this.total_shortage_amount_fcy +=
            bfa.cashPerformanceBranch?.amount_shortage;
        }
      }
    }
  }

  computeCashManagement(audit: CompiledBranchAudit) {
    this.total_average_cash_holding_lcy = 0;
    this.total_cash_set_limit_lcy = 0;
    this.total_average_cash_holding_fcy = 0;
    this.total_cash_set_limit_fcy = 0;
    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.cashManagementBranch?.cash_type != 'FCY') {
        if (bfa.cashManagementBranch?.average_cash_holding) {
          this.total_average_cash_holding_lcy +=
            bfa.cashManagementBranch?.average_cash_holding;
        }
        if (bfa.cashManagementBranch?.branch_cash_set_limit) {
          this.total_cash_set_limit_lcy +=
            bfa.cashManagementBranch?.branch_cash_set_limit;
        }
      } else {
        if (bfa.cashManagementBranch?.average_cash_holding) {
          this.total_average_cash_holding_fcy +=
            bfa.cashManagementBranch?.average_cash_holding;
        }
        if (bfa.cashManagementBranch?.branch_cash_set_limit) {
          this.total_cash_set_limit_fcy +=
            bfa.cashManagementBranch?.branch_cash_set_limit;
        }
      }
    }
  }

  computeCashCount(audit: CompiledBranchAudit) {
    this.total_actual_cash_count_lcy = 0;
    this.total_trial_balance_fcy = 0;
    this.total_actual_cash_count_fcy = 0;
    this.total_trial_balance_lcy = 0;
    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.cashcount?.cash_count_type != 'FCY') {
        if (bfa.cashcount?.actual_cash_count) {
          this.total_actual_cash_count_lcy += bfa.cashcount?.actual_cash_count;
        }
        if (bfa.cashcount?.trial_balance) {
          this.total_trial_balance_lcy += bfa.cashcount?.trial_balance;
        }
      } else {
        if (bfa.cashcount?.actual_cash_count) {
          this.total_actual_cash_count_fcy += bfa.cashcount?.actual_cash_count;
        }
        if (bfa.cashcount?.trial_balance) {
          this.total_trial_balance_fcy += bfa.cashcount?.trial_balance;
        }
      }
    }
  }

  computeIncompleteAccount(audit: CompiledBranchAudit) {
    this.total_amount_withdraw_lcy = 0;
    this.total_amount_withdraw_fcy = 0;
    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.incompleteAccountBranch?.account_type != 'FCY') {
        if (bfa.incompleteAccountBranch?.account_opened_amount) {
          this.total_amount_withdraw_lcy +=
            bfa.incompleteAccountBranch?.account_opened_amount;
        }
      } else {
        if (bfa.incompleteAccountBranch?.account_opened_amount) {
          this.total_amount_withdraw_fcy +=
            bfa.incompleteAccountBranch?.account_opened_amount;
        }
      }
    }
  }

  computeAtmCard(audit: CompiledBranchAudit) {
    this.total_issued_card = 0;
    this.total_distributed_card = 0;
    this.total_remaining_card = 0;
    this.total_retarned_card = 0;
    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.atmCardBranch?.issued_card) {
        this.total_issued_card += bfa.atmCardBranch?.issued_card;
      }

      if (bfa.atmCardBranch?.distributed_card) {
        this.total_distributed_card += bfa.atmCardBranch?.distributed_card;
      }

      if (bfa.atmCardBranch?.remaining_card) {
        this.total_remaining_card += bfa.atmCardBranch?.remaining_card;
      }

      if (bfa.atmCardBranch?.returned_card) {
        this.total_retarned_card += bfa.atmCardBranch?.returned_card;
      }
    }
  }

  computeDormantAccount(audit: CompiledBranchAudit) {
    this.total_amount_withdraw_dormant_lcy = 0;
    this.total_amount_withdraw_dormant_fcy = 0;
    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.dormantInactive?.cash_type != 'FCY') {
        if (bfa.dormantInactive?.amount) {
          this.total_amount_withdraw_dormant_lcy += bfa.dormantInactive?.amount;
        }
      } else {
        if (bfa.dormantInactive?.amount) {
          this.total_amount_withdraw_dormant_fcy += bfa.dormantInactive?.amount;
        }
      }
    }
  }

  computeOperationalDiscrepancy(audit: CompiledBranchAudit) {
    this.total_amount_lcy = 0;
    this.total_amount_fcy = 0;
    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.operationalDescripancyBranch?.cash_type != 'FCY') {
        if (bfa.operationalDescripancyBranch?.amount) {
          this.total_amount_lcy += bfa.operationalDescripancyBranch?.amount;
        }
      } else {
        if (bfa.operationalDescripancyBranch?.amount) {
          this.total_amount_fcy += bfa.operationalDescripancyBranch?.amount;
        }
      }
    }
  }

  computeAssetLiability(audit: CompiledBranchAudit) {
    this.total_asset_amount = 0;
    this.total_liability_amount = 0;
    this.total_asset_amount_fcy = 0;
    this.total_liability_amount_fcy = 0;

    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.assetLiabilityBranch?.cash_type != 'FCY') {
        if (bfa.assetLiabilityBranch?.asset_amount) {
          this.total_asset_amount += bfa.assetLiabilityBranch?.asset_amount;
        }
        if (bfa.assetLiabilityBranch?.liability_amount) {
          this.total_liability_amount +=
            bfa.assetLiabilityBranch?.liability_amount;
        }
      } else {
        if (bfa.assetLiabilityBranch?.asset_amount) {
          this.total_asset_amount_fcy += bfa.assetLiabilityBranch?.asset_amount;
        }
        if (bfa.assetLiabilityBranch?.liability_amount) {
          this.total_liability_amount_fcy +=
            bfa.assetLiabilityBranch?.liability_amount;
        }
      }
    }
  }

  computeAbnormalBalance(audit: CompiledBranchAudit) {
    this.total_credit_amount = 0;
    this.total_debit_amount = 0;
    this.total_credit_amount_fcy = 0;
    this.total_debit_amount_fcy = 0;

    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.abnormalBalanceBranch?.cash_type != 'FCY') {
        if (bfa.abnormalBalanceBranch?.credit) {
          this.total_credit_amount += bfa.abnormalBalanceBranch?.credit;
        }
        if (bfa.abnormalBalanceBranch?.debit) {
          this.total_debit_amount += bfa.abnormalBalanceBranch?.debit;
        }
      } else {
        if (bfa.abnormalBalanceBranch?.credit) {
          this.total_credit_amount_fcy += bfa.abnormalBalanceBranch?.credit;
        }
        if (bfa.abnormalBalanceBranch?.debit) {
          this.total_debit_amount_fcy += bfa.abnormalBalanceBranch?.debit;
        }
      }
    }
  }

  computeNegotiable(audit: CompiledBranchAudit) {
    this.total_amount = 0;
    this.total_trail_balance_amount = 0;

    this.total_amount_fcy = 0;
    this.total_trial_balance_amount_fcy = 0;

    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.negotiableInstrument?.cash_type != 'FCY') {
        if (bfa.negotiableInstrument?.amount) {
          this.total_amount += bfa.negotiableInstrument?.amount;
        }
        if (bfa.negotiableInstrument?.trial_balance) {
          this.total_trail_balance_amount +=
            bfa.negotiableInstrument?.trial_balance;
        }
      } else {
        if (bfa.negotiableInstrument?.amount) {
          this.total_amount_fcy += bfa.negotiableInstrument?.amount;
        }
        if (bfa.negotiableInstrument?.trial_balance) {
          this.total_trial_balance_amount_fcy +=
            bfa.negotiableInstrument?.trial_balance;
        }
      }
    }
  }

  computeSuspenseAccount(audit: CompiledBranchAudit) {
    this.total_balance_per_tracer = 0;
    this.total_balance_per_trial_balance = 0;

    this.total_balance_per_tracer_fcy = 0;
    this.total_balance_per_trial_balance_fcy = 0;

    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.suspenseAccountBranch?.cash_type != 'FCY') {
        if (bfa.suspenseAccountBranch?.balance_per_tracer) {
          this.total_balance_per_tracer +=
            bfa.suspenseAccountBranch?.balance_per_tracer;
        }
        if (bfa.suspenseAccountBranch?.balance_per_trial_balance) {
          this.total_balance_per_trial_balance +=
            bfa.suspenseAccountBranch?.balance_per_trial_balance;
        }
      } else {
        if (bfa.suspenseAccountBranch?.balance_per_tracer) {
          this.total_balance_per_tracer_fcy +=
            bfa.suspenseAccountBranch?.balance_per_tracer;
        }
        if (bfa.suspenseAccountBranch?.balance_per_trial_balance) {
          this.total_balance_per_trial_balance_fcy +=
            bfa.suspenseAccountBranch?.balance_per_trial_balance;
        }
      }
    }
  }

  computeControllableExpense(audit: CompiledBranchAudit) {
    this.budget_per_plan = 0;
    this.actual_balance = 0;

    this.budget_per_plan_fcy = 0;
    this.actual_balance_fcy = 0;

    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.controllableExpense?.cash_type != 'FCY') {
        if (bfa.controllableExpense?.budget_per_plan) {
          this.budget_per_plan += bfa.controllableExpense?.budget_per_plan;
        }
        if (bfa.controllableExpense?.actual_balance) {
          this.actual_balance += bfa.controllableExpense?.actual_balance;
        }
      } else {
        if (bfa.controllableExpense?.budget_per_plan) {
          this.budget_per_plan_fcy += bfa.controllableExpense?.budget_per_plan;
        }
        if (bfa.controllableExpense?.actual_balance) {
          this.actual_balance_fcy += bfa.controllableExpense?.actual_balance;
        }
      }
    }
  }
  computeLoanandAdvance(audit: CompiledBranchAudit) {
    this.total_approved_amount = 0;
    this.total_overdrawn_balance = 0;
    this.total_approved_amount_fcy = 0;
    this.total_overdrawn_balance_fcy = 0;

    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.loanAndAdvance?.cash_type != 'FCY') {
        if (bfa.loanAndAdvance?.overDraft?.approved_amount) {
          this.total_approved_amount +=
            bfa.loanAndAdvance?.overDraft.approved_amount;
        }
        if (bfa.loanAndAdvance?.overDraft?.overdrawn_balance) {
          this.total_overdrawn_balance +=
            bfa.loanAndAdvance?.overDraft.overdrawn_balance;
        }
      } else {
        if (bfa.loanAndAdvance?.overDraft?.approved_amount) {
          this.total_approved_amount_fcy +=
            bfa.loanAndAdvance?.overDraft.approved_amount;
        }
        if (bfa.loanAndAdvance?.overDraft?.overdrawn_balance) {
          this.total_overdrawn_balance_fcy +=
            bfa.loanAndAdvance?.overDraft.overdrawn_balance;
        }
      }
    }
  }

  computeLongOutstanding(audit: CompiledBranchAudit) {
    this.trial_balance_l = 0;
    this.total_amount_L = 0;
    this.trial_balance_l_fcy = 0;
    this.total_amount_L_fcy = 0;

    for (let bfa of audit.branchFinancialAudits) {
      if (bfa.long_outstanding?.cash_type != 'FCY') {
        if (bfa.long_outstanding?.trial_balance) {
          this.trial_balance_l += bfa.long_outstanding?.trial_balance;
        }
        if (bfa.long_outstanding?.total_amount) {
          this.total_amount_L += bfa.long_outstanding?.total_amount;
        }
      } else {
        if (bfa.long_outstanding?.trial_balance) {
          this.trial_balance_l_fcy += bfa.long_outstanding?.trial_balance;
        }
        if (bfa.long_outstanding?.total_amount) {
          this.total_amount_L_fcy += bfa.long_outstanding?.total_amount;
        }
      }
    }
  }


  hideDialog()
  {
    this.auditDetailDialog = false;
  }

  hideFileDialog()
  {
    this.filesDialog = false;
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

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.compiledRegionalAudits);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}



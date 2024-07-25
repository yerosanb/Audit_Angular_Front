import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BranchFinancialAudit } from 'app/branch_audit/model/branch-financial-audit';
import { CompiledBranchAudit } from 'app/branch_audit/model/compiled-branch-audit';
import { RegionalCompilerService } from 'app/branch_audit/services/regional-compiler.service';
import { User } from 'app/models/admin/user';
import { BranchService } from 'app/services/admin/branch.service';
import { StorageService } from 'app/services/shared/storage.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-compile-branch-audits',
  templateUrl: './compile-branch-audits.component.html',
  styleUrls: ['./compile-branch-audits.component.css'],
})
export class CompileBranchAuditsComponent {
  @Input() passedData: any;

  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  public Editor = ClassicEditor;

  compiledBranchAudit = new CompiledBranchAudit();

  branchFinancialAudits: BranchFinancialAudit[];

  originalBranchFinancialAudits: BranchFinancialAudit[];

  branchFinancialAudit = new BranchFinancialAudit();

  is_new_finding = false;

  is_new_impact = false;

  is_new_recommendation = false;

  message = '';

  compiler = new User();

  public config = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'insertTable',
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        '|',
        'undo',
        'redo'
      ]
    },
    language: 'en'
  };

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private branchService: BranchService,
    private storageService: StorageService,
    private compilerService: RegionalCompilerService
  ) {}

  ngOnInit() {
    this.branchFinancialAudit = new BranchFinancialAudit();
    this.originalBranchFinancialAudits = this.passedData[0];
    this.branchFinancialAudits = this.originalBranchFinancialAudits;
    this.branchFinancialAudit.finding = 'New Finding?';
    this.branchFinancialAudit.impact = 'New Impact?';
    this.branchFinancialAudit.recommendation = 'New Recommendation?';
    this.branchFinancialAudits.push(this.branchFinancialAudit);
    this.compiledBranchAudit.audit_type = this.passedData[1];
    if (this.passedData[1] == 'StatusOfAudit') {
      this.is_new_finding = true;

      this.is_new_impact = true;

      this.is_new_recommendation = true;
    }
  }
  onChangeFindingDropdown(finding: String) {
    if (finding.includes('New Finding')) {
      this.is_new_finding = true;
    } else {
      this.compiledBranchAudit.finding = finding;
    }
  }

  onChangeImpactDropdown(impact: String) {
    if (impact.includes('New Impact')) {
      this.is_new_impact = true;
    } else {
      this.compiledBranchAudit.impact = impact;
    }
  }

  onChangeRecommendationDropdown(recommendation: String) {
    if (recommendation.includes('New Recommendation')) {
      this.is_new_recommendation = true;
    } else {
      this.compiledBranchAudit.recommendation = recommendation;
    }
  }

  emitData(data: BranchFinancialAudit[]) {
    this.dataChange.emit(data);
  }

  saveCompiledAudits(): void {
    // let compiled_audits_id: Number[] | any;
    // if (this.originalBranchFinancialAudits) {
    //   if (this.compiledBranchAudit.audit_type == 'IncompleteAccount') {
    //     compiled_audits_id = this.originalBranchFinancialAudits
    //       .filter(
    //         (branchFinancialAudit: BranchFinancialAudit) =>
    //           branchFinancialAudit?.incompleteAccountBranch?.id
    //       )
    //       .map(
    //         (branchFinancialAudit: BranchFinancialAudit) =>
    //           branchFinancialAudit?.incompleteAccountBranch?.id
    //       );
    //   }
    // }
    // if (compiled_audits_id) {
    //   this.compiledBranchAudit.compiled_audits = compiled_audits_id;
    // }
    this.compiledBranchAudit.branchFinancialAudits =
      this.originalBranchFinancialAudits;

    this.compiler.id = this.storageService.getUser().id;
    this.compiledBranchAudit.compiler = this.compiler;
    this.compilerService.compileFindings(this.compiledBranchAudit).subscribe({
      next: (response: any) => {
        this.message = 'Findings successfully compiled';
        this.messageService.add({
          severity: 'success',
          summary: `${this.message}`,
          detail: '',
        });
        this.emitData(this.originalBranchFinancialAudits);
      },
      error: (error: HttpErrorResponse) => {
        this.message = error.error.message;
        this.messageService.add({
          severity: 'error',
          summary: `${this.message}`,
          detail: '',
          sticky: true,
        });
      },
    });
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CompiledBranchAudit } from 'app/branch_audit/model/compiled-branch-audit';
import { CompiledRegionalAudit } from 'app/branch_audit/model/compiled-regional-audit';
import { DivisionCompilerForCompilingService } from 'app/branch_audit/services/division-compiler-for-compiling.service';
import { User } from 'app/models/admin/user';
import { BranchService } from 'app/services/admin/branch.service';
import { StorageService } from 'app/services/shared/storage.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-compile-compiled-audits-division',
  templateUrl: './compile-compiled-audits-division.component.html',
  styleUrls: ['./compile-compiled-audits-division.component.css']
})
export class CompileCompiledAuditsDivisionComponent {
  @Input() passedData: any;

  @Output() dataChange: EventEmitter<any> = new EventEmitter();


  public Editor = ClassicEditor;

  compiledRegionalAudit = new CompiledRegionalAudit();

  compiledBranchAudits: CompiledBranchAudit[];

  originalCompiledBranchAudits: CompiledBranchAudit[];

  compiledBranchAudit = new CompiledBranchAudit();

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
    private compilerService: DivisionCompilerForCompilingService
  ) {}

  ngOnInit() {
    this.compiledBranchAudit = new CompiledBranchAudit();
    this.originalCompiledBranchAudits = this.passedData[0];
    console.log("original ", this.originalCompiledBranchAudits)
    this.compiledBranchAudits = this.originalCompiledBranchAudits;
    this.compiledBranchAudit.finding = 'New Finding?';
    this.compiledBranchAudit.impact = 'New Impact?';
    this.compiledBranchAudit.recommendation = 'New Recommendation?';
    this.compiledBranchAudits.push(this.compiledBranchAudit);
    this.compiledRegionalAudit.audit_type = this.passedData[1];
  }
  onChangeFindingDropdown(finding: String) {
    if (finding.includes('New Finding')) {
      this.is_new_finding = true;
    } else {
      this.compiledRegionalAudit.finding = finding;
    }
  }

  onChangeImpactDropdown(impact: String) {
    if (impact.includes('New Impact')) {
      this.is_new_impact = true;
    } else {
      this.compiledRegionalAudit.impact = impact;
    }
  }

  onChangeRecommendationDropdown(recommendation: String) {
    if (recommendation.includes('New Recommendation')) {
      this.is_new_recommendation = true;
    } else {
      this.compiledRegionalAudit.recommendation = recommendation;
    }
  }

  emitData(data: CompiledBranchAudit[]) {
    this.dataChange.emit(data);
  }

  saveCompiledAudits(): void {
    // let compiled_audits_id: Number[] | any;
    // if (this.originalcompiledBranchAudits) {
    //   if (this.compiledRegionalAudit.audit_type == 'IncompleteAccount') {
    //     compiled_audits_id = this.originalcompiledBranchAudits
    //       .filter(
    //         (CompiledBranchAudit: CompiledBranchAudit) =>
    //           CompiledBranchAudit?.incompleteAccountBranch?.id
    //       )
    //       .map(
    //         (CompiledBranchAudit: CompiledBranchAudit) =>
    //           CompiledBranchAudit?.incompleteAccountBranch?.id
    //       );
    //   }
    // }
    // if (compiled_audits_id) {
    //   this.compiledRegionalAudit.compiled_audits = compiled_audits_id;
    // }
    this.compiledRegionalAudit.compiledBranchAudits = this.originalCompiledBranchAudits;

    this.compiler.id = this.storageService.getUser().id;
    this.compiledRegionalAudit.compiler = this.compiler;
    this.compilerService.compileFindings(this.compiledRegionalAudit).subscribe({
      next: (response: any) => {
        this.message = 'Findings successfully compiled';
        this.messageService.add({
          severity: 'success',
          summary: `${this.message}`,
          detail: '',
        });
        this.emitData(this.originalCompiledBranchAudits);
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


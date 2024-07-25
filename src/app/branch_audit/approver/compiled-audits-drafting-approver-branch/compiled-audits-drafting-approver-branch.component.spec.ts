import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledAuditsDraftingApproverBranchComponent } from './compiled-audits-drafting-approver-branch.component';

describe('CompiledAuditsDraftingApproverBranchComponent', () => {
  let component: CompiledAuditsDraftingApproverBranchComponent;
  let fixture: ComponentFixture<CompiledAuditsDraftingApproverBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledAuditsDraftingApproverBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledAuditsDraftingApproverBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

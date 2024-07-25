import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledApprovedAuditsBranchComponent } from './compiled-approved-audits-branch.component';

describe('CompiledApprovedAuditsBranchComponent', () => {
  let component: CompiledApprovedAuditsBranchComponent;
  let fixture: ComponentFixture<CompiledApprovedAuditsBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledApprovedAuditsBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledApprovedAuditsBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

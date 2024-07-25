import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledPendingAuditsBranchComponent } from './compiled-pending-audits-branch.component';

describe('CompiledPendingAuditsBranchComponent', () => {
  let component: CompiledPendingAuditsBranchComponent;
  let fixture: ComponentFixture<CompiledPendingAuditsBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledPendingAuditsBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledPendingAuditsBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

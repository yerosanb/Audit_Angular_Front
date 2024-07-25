import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledCompletedAuditsBranchComponent } from './compiled-completed-audits-branch.component';

describe('CompiledCompletedAuditsBranchComponent', () => {
  let component: CompiledCompletedAuditsBranchComponent;
  let fixture: ComponentFixture<CompiledCompletedAuditsBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledCompletedAuditsBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledCompletedAuditsBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

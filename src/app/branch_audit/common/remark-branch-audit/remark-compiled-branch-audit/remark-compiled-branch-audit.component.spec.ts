import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkCompiledBranchAuditComponent } from './remark-compiled-branch-audit.component';

describe('RemarkCompiledBranchAuditComponent', () => {
  let component: RemarkCompiledBranchAuditComponent;
  let fixture: ComponentFixture<RemarkCompiledBranchAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarkCompiledBranchAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemarkCompiledBranchAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

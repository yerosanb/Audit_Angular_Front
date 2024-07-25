import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkRegionalBranchAuditComponent } from './remark-regional-branch-audit.component';

describe('RemarkRegionalBranchAuditComponent', () => {
  let component: RemarkRegionalBranchAuditComponent;
  let fixture: ComponentFixture<RemarkRegionalBranchAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarkRegionalBranchAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemarkRegionalBranchAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

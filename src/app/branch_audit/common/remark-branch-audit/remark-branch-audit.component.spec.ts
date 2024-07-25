import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkBranchAuditComponent } from './remark-branch-audit.component';

describe('RemarkBranchAuditComponent', () => {
  let component: RemarkBranchAuditComponent;
  let fixture: ComponentFixture<RemarkBranchAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarkBranchAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemarkBranchAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

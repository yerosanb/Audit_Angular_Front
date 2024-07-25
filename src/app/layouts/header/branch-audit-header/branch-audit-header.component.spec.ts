import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAuditHeaderComponent } from './branch-audit-header.component';

describe('BranchAuditHeaderComponent', () => {
  let component: BranchAuditHeaderComponent;
  let fixture: ComponentFixture<BranchAuditHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchAuditHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchAuditHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAuditComponent } from './branch-audit.component';

describe('BranchAuditComponent', () => {
  let component: BranchAuditComponent;
  let fixture: ComponentFixture<BranchAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

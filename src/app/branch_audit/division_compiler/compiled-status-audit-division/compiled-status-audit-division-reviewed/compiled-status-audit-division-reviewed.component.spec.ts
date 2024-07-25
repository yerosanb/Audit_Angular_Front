import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledStatusAuditDivisionReviewedComponent } from './compiled-status-audit-division-reviewed.component';

describe('CompiledStatusAuditDivisionReviewedComponent', () => {
  let component: CompiledStatusAuditDivisionReviewedComponent;
  let fixture: ComponentFixture<CompiledStatusAuditDivisionReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledStatusAuditDivisionReviewedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledStatusAuditDivisionReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

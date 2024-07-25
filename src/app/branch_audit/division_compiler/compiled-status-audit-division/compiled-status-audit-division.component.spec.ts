import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledStatusAuditDivisionComponent } from './compiled-status-audit-division.component';

describe('CompiledStatusAuditDivisionComponent', () => {
  let component: CompiledStatusAuditDivisionComponent;
  let fixture: ComponentFixture<CompiledStatusAuditDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledStatusAuditDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledStatusAuditDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

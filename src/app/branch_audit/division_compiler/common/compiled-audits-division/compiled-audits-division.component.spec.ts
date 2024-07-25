import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledAuditsDivisionComponent } from './compiled-audits-division.component';

describe('CompiledAuditsDivisionComponent', () => {
  let component: CompiledAuditsDivisionComponent;
  let fixture: ComponentFixture<CompiledAuditsDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledAuditsDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledAuditsDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

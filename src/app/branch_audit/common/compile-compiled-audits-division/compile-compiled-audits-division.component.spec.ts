import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompileCompiledAuditsDivisionComponent } from './compile-compiled-audits-division.component';

describe('CompileCompiledAuditsDivisionComponent', () => {
  let component: CompileCompiledAuditsDivisionComponent;
  let fixture: ComponentFixture<CompileCompiledAuditsDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompileCompiledAuditsDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompileCompiledAuditsDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

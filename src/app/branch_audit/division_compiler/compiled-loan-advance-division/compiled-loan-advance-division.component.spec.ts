import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledLoanAdvanceDivisionComponent } from './compiled-loan-advance-division.component';

describe('CompiledLoanAdvanceDivisionComponent', () => {
  let component: CompiledLoanAdvanceDivisionComponent;
  let fixture: ComponentFixture<CompiledLoanAdvanceDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledLoanAdvanceDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledLoanAdvanceDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

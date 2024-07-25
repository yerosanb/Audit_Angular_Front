import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledCashPerformanceDivisionComponent } from './compiled-cash-performance-division.component';

describe('CompiledCashPerformanceDivisionComponent', () => {
  let component: CompiledCashPerformanceDivisionComponent;
  let fixture: ComponentFixture<CompiledCashPerformanceDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledCashPerformanceDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledCashPerformanceDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

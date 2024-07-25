import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPerformancePassedComponent } from './cash-performance-passed.component';

describe('CashPerformancePassedComponent', () => {
  let component: CashPerformancePassedComponent;
  let fixture: ComponentFixture<CashPerformancePassedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashPerformancePassedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashPerformancePassedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

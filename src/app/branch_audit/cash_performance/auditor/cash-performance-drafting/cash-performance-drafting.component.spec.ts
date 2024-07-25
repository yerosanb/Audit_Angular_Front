import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPerformanceDraftingComponent } from './cash-performance-drafting.component';

describe('CashPerformanceDraftingComponent', () => {
  let component: CashPerformanceDraftingComponent;
  let fixture: ComponentFixture<CashPerformanceDraftingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashPerformanceDraftingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashPerformanceDraftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

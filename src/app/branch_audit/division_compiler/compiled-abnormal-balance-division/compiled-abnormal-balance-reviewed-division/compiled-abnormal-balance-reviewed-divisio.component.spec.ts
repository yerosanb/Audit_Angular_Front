import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledAbnormalBalanceReviewedDivisioComponent } from './compiled-abnormal-balance-reviewed-divisio.component';

describe('CompiledAbnormalBalanceReviewedDivisioComponent', () => {
  let component: CompiledAbnormalBalanceReviewedDivisioComponent;
  let fixture: ComponentFixture<CompiledAbnormalBalanceReviewedDivisioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledAbnormalBalanceReviewedDivisioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledAbnormalBalanceReviewedDivisioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

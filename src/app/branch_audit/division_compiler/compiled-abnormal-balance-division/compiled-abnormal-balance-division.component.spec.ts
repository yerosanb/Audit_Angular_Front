import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledAbnormalBalanceDivisionComponent } from './compiled-abnormal-balance-division.component';

describe('CompiledAbnormalBalanceDivisionComponent', () => {
  let component: CompiledAbnormalBalanceDivisionComponent;
  let fixture: ComponentFixture<CompiledAbnormalBalanceDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledAbnormalBalanceDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledAbnormalBalanceDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

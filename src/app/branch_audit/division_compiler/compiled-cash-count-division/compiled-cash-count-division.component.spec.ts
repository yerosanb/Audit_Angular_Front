import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledCashCountDivisionComponent } from './compiled-cash-count-division.component';

describe('CompiledCashCountDivisionComponent', () => {
  let component: CompiledCashCountDivisionComponent;
  let fixture: ComponentFixture<CompiledCashCountDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledCashCountDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledCashCountDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

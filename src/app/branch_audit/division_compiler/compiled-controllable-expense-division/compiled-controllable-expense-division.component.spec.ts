import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledControllableExpenseDivisionComponent } from './compiled-controllable-expense-division.component';

describe('CompiledControllableExpenseDivisionComponent', () => {
  let component: CompiledControllableExpenseDivisionComponent;
  let fixture: ComponentFixture<CompiledControllableExpenseDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledControllableExpenseDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledControllableExpenseDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

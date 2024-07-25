import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashcountpassedComponent } from './cashcountpassed.component';

describe('CashcountpassedComponent', () => {
  let component: CashcountpassedComponent;
  let fixture: ComponentFixture<CashcountpassedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashcountpassedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashcountpassedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

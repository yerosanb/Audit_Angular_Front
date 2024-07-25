import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashcountpendingComponent } from './cashcountpending.component';

describe('CashcountpendingComponent', () => {
  let component: CashcountpendingComponent;
  let fixture: ComponentFixture<CashcountpendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashcountpendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashcountpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

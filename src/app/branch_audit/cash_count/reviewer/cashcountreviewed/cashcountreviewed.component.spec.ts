import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashcountreviewedComponent } from './cashcountreviewed.component';

describe('CashcountreviewedComponent', () => {
  let component: CashcountreviewedComponent;
  let fixture: ComponentFixture<CashcountreviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashcountreviewedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashcountreviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

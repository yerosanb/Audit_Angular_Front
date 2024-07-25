import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashcountdivisionreviewedComponent } from './cashcountdivisionreviewed.component';

describe('CashcountdivisionreviewedComponent', () => {
  let component: CashcountdivisionreviewedComponent;
  let fixture: ComponentFixture<CashcountdivisionreviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashcountdivisionreviewedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashcountdivisionreviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

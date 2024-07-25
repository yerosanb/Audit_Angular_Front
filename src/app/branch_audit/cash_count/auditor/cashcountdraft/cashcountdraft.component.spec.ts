import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashcountdraftComponent } from './cashcountdraft.component';

describe('CashcountdraftComponent', () => {
  let component: CashcountdraftComponent;
  let fixture: ComponentFixture<CashcountdraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashcountdraftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashcountdraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

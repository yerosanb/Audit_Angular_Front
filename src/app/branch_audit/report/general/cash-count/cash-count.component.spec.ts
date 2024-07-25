import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCountComponent } from './cash-count.component';

describe('CashCountComponent', () => {
  let component: CashCountComponent;
  let fixture: ComponentFixture<CashCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

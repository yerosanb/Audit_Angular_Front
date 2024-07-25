import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbnormalBalanceCreatEditComponent } from './abnormal-balance-creat-edit.component';

describe('AbnormalBalanceCreatEditComponent', () => {
  let component: AbnormalBalanceCreatEditComponent;
  let fixture: ComponentFixture<AbnormalBalanceCreatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbnormalBalanceCreatEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbnormalBalanceCreatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

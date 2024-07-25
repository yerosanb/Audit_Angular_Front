import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusofauditpendingbmComponent } from './statusofauditpendingbm.component';

describe('StatusofauditpendingbmComponent', () => {
  let component: StatusofauditpendingbmComponent;
  let fixture: ComponentFixture<StatusofauditpendingbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusofauditpendingbmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusofauditpendingbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

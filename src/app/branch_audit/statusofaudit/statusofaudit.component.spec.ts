import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusofauditComponent } from './statusofaudit.component';

describe('StatusofauditComponent', () => {
  let component: StatusofauditComponent;
  let fixture: ComponentFixture<StatusofauditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusofauditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusofauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

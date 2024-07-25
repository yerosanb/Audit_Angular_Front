import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusofauditunreviewComponent } from './statusofauditunreview.component';

describe('StatusofauditunreviewComponent', () => {
  let component: StatusofauditunreviewComponent;
  let fixture: ComponentFixture<StatusofauditunreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusofauditunreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusofauditunreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

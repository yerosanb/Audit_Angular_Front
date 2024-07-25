import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusofauditreviewComponent } from './statusofauditreview.component';

describe('StatusofauditreviewComponent', () => {
  let component: StatusofauditreviewComponent;
  let fixture: ComponentFixture<StatusofauditreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusofauditreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusofauditreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

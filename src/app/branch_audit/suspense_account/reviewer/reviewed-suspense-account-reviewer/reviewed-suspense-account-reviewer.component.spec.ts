import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewedSuspenseAccountReviewerComponent } from './reviewed-suspense-account-reviewer.component';

describe('ReviewedSuspenseAccountReviewerComponent', () => {
  let component: ReviewedSuspenseAccountReviewerComponent;
  let fixture: ComponentFixture<ReviewedSuspenseAccountReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewedSuspenseAccountReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewedSuspenseAccountReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

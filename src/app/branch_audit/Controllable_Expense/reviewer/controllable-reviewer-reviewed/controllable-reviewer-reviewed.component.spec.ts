import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllableReviewerReviewedComponent } from './controllable-reviewer-reviewed.component';

describe('ControllableReviewerReviewedComponent', () => {
  let component: ControllableReviewerReviewedComponent;
  let fixture: ComponentFixture<ControllableReviewerReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllableReviewerReviewedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllableReviewerReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

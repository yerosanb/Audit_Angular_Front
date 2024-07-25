import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllableReviewerPendingComponent } from './controllable-reviewer-pending.component';

describe('ControllableReviewerPendingComponent', () => {
  let component: ControllableReviewerPendingComponent;
  let fixture: ComponentFixture<ControllableReviewerPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllableReviewerPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllableReviewerPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

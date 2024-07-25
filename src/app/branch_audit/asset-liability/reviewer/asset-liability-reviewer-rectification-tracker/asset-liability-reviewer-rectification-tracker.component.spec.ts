import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLiabilityReviewerRectificationTrackerComponent } from './asset-liability-reviewer-rectification-tracker.component';

describe('AssetLiabilityReviewerRectificationTrackerComponent', () => {
  let component: AssetLiabilityReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<AssetLiabilityReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetLiabilityReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetLiabilityReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

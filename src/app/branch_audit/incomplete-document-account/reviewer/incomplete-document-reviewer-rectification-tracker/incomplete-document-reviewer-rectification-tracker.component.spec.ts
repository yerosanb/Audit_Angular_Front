import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteDocumentReviewerRectificationTrackerComponent } from './incomplete-document-reviewer-rectification-tracker.component';

describe('IncompleteDocumentReviewerRectificationTrackerComponent', () => {
  let component: IncompleteDocumentReviewerRectificationTrackerComponent;
  let fixture: ComponentFixture<IncompleteDocumentReviewerRectificationTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteDocumentReviewerRectificationTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncompleteDocumentReviewerRectificationTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

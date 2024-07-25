import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerMemorandumDraftingComponent } from './reviewer-memorandum-drafting.component';

describe('ReviewerMemorandumDraftingComponent', () => {
  let component: ReviewerMemorandumDraftingComponent;
  let fixture: ComponentFixture<ReviewerMemorandumDraftingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerMemorandumDraftingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewerMemorandumDraftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

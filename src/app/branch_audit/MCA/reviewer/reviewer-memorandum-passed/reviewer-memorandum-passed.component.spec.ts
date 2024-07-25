import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerMemorandumPassedComponent } from './reviewer-memorandum-passed.component';

describe('ReviewerMemorandumPassedComponent', () => {
  let component: ReviewerMemorandumPassedComponent;
  let fixture: ComponentFixture<ReviewerMemorandumPassedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerMemorandumPassedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewerMemorandumPassedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

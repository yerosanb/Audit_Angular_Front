import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmCardReviewedReviewerComponent } from './atm-card-reviewed-reviewer.component';

describe('AtmCardReviewedReviewerComponent', () => {
  let component: AtmCardReviewedReviewerComponent;
  let fixture: ComponentFixture<AtmCardReviewedReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtmCardReviewedReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtmCardReviewedReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

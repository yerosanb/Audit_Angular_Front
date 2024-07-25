import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecommendationComponent } from './manage-recommendation.component';

describe('ManageRecommendationComponent', () => {
  let component: ManageRecommendationComponent;
  let fixture: ComponentFixture<ManageRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRecommendationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

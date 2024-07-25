import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralObservationCommentComponent } from './general-observation-comment.component';

describe('GeneralObservationCommentComponent', () => {
  let component: GeneralObservationCommentComponent;
  let fixture: ComponentFixture<GeneralObservationCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralObservationCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralObservationCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

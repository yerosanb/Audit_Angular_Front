import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalDescripancyReviewerComponent } from './operational-descripancy-reviewer.component';

describe('OperationalDescripancyReviewerComponent', () => {
  let component: OperationalDescripancyReviewerComponent;
  let fixture: ComponentFixture<OperationalDescripancyReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalDescripancyReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalDescripancyReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

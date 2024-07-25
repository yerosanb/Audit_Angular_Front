import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalDescripancyReviewedRegionalComponent } from './operational-descripancy-reviewed-regional.component';

describe('OperationalDescripancyReviewedRegionalComponent', () => {
  let component: OperationalDescripancyReviewedRegionalComponent;
  let fixture: ComponentFixture<OperationalDescripancyReviewedRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalDescripancyReviewedRegionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalDescripancyReviewedRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

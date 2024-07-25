import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewedlongoutstandingitemsComponent } from './reviewedlongoutstandingitems.component';

describe('ReviewedlongoutstandingitemsComponent', () => {
  let component: ReviewedlongoutstandingitemsComponent;
  let fixture: ComponentFixture<ReviewedlongoutstandingitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewedlongoutstandingitemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewedlongoutstandingitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

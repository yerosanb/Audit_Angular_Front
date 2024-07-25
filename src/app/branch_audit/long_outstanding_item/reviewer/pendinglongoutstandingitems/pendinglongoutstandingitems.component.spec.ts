import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendinglongoutstandingitemsComponent } from './pendinglongoutstandingitems.component';

describe('PendinglongoutstandingitemsComponent', () => {
  let component: PendinglongoutstandingitemsComponent;
  let fixture: ComponentFixture<PendinglongoutstandingitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendinglongoutstandingitemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendinglongoutstandingitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralObservationCreateEditComponent } from './general-observation-create-edit.component';

describe('GeneralObservationCreateEditComponent', () => {
  let component: GeneralObservationCreateEditComponent;
  let fixture: ComponentFixture<GeneralObservationCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralObservationCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralObservationCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

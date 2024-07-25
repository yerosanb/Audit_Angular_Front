import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledGeneralObservationDivisionComponent } from './compiled-general-observation-division.component';

describe('CompiledGeneralObservationDivisionComponent', () => {
  let component: CompiledGeneralObservationDivisionComponent;
  let fixture: ComponentFixture<CompiledGeneralObservationDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledGeneralObservationDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledGeneralObservationDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledAtmCardReviewedDivisionComponent } from './compiled-atm-card-reviewed-division.component';

describe('CompiledAtmCardReviewedDivisionComponent', () => {
  let component: CompiledAtmCardReviewedDivisionComponent;
  let fixture: ComponentFixture<CompiledAtmCardReviewedDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledAtmCardReviewedDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledAtmCardReviewedDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

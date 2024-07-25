import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledMemorandumReviewedDivisionComponent } from './compiled-memorandum-reviewed-division.component';

describe('CompiledMemorandumReviewedDivisionComponent', () => {
  let component: CompiledMemorandumReviewedDivisionComponent;
  let fixture: ComponentFixture<CompiledMemorandumReviewedDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledMemorandumReviewedDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledMemorandumReviewedDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

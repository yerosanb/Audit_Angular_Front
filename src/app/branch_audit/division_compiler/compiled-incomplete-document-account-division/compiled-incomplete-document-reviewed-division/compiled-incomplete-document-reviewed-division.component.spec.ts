import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledIncompleteDocumentReviewedDivisionComponent } from './compiled-incomplete-document-reviewed-division.component';

describe('CompiledIncompleteDocumentReviewedDivisionComponent', () => {
  let component: CompiledIncompleteDocumentReviewedDivisionComponent;
  let fixture: ComponentFixture<CompiledIncompleteDocumentReviewedDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledIncompleteDocumentReviewedDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledIncompleteDocumentReviewedDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

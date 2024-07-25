import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledIncompleteDocumentAccountDivisionComponent } from './compiled-incomplete-document-account-division.component';

describe('CompiledIncompleteDocumentAccountDivisionComponent', () => {
  let component: CompiledIncompleteDocumentAccountDivisionComponent;
  let fixture: ComponentFixture<CompiledIncompleteDocumentAccountDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledIncompleteDocumentAccountDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledIncompleteDocumentAccountDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteDocumentAccountCreateEditComponent } from './incomplete-document-account-create-edit.component';

describe('IncompleteDocumentAccountCreateEditComponent', () => {
  let component: IncompleteDocumentAccountCreateEditComponent;
  let fixture: ComponentFixture<IncompleteDocumentAccountCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteDocumentAccountCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncompleteDocumentAccountCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

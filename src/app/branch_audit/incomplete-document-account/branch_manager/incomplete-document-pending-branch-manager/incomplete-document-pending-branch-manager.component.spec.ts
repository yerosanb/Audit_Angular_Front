import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteDocumentPendingBranchManagerComponent } from './incomplete-document-pending-branch-manager.component';

describe('IncompleteDocumentPendingBranchManagerComponent', () => {
  let component: IncompleteDocumentPendingBranchManagerComponent;
  let fixture: ComponentFixture<IncompleteDocumentPendingBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteDocumentPendingBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncompleteDocumentPendingBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

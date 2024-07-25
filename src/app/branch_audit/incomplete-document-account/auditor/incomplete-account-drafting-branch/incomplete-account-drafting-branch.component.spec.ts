import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteAccountDraftingBranchComponent } from './incomplete-account-drafting-branch.component';

describe('IncompleteAccountDraftingBranchComponent', () => {
  let component: IncompleteAccountDraftingBranchComponent;
  let fixture: ComponentFixture<IncompleteAccountDraftingBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteAccountDraftingBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncompleteAccountDraftingBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

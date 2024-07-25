import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenseAccountDraftingBranchComponent } from './suspense-account-drafting-branch.component';

describe('SuspenseAccountDraftingBranchComponent', () => {
  let component: SuspenseAccountDraftingBranchComponent;
  let fixture: ComponentFixture<SuspenseAccountDraftingBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspenseAccountDraftingBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspenseAccountDraftingBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

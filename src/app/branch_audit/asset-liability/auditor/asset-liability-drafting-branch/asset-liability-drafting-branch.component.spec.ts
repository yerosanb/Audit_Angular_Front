import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLiabilityDraftingBranchComponent } from './asset-liability-drafting-branch.component';

describe('AssetLiabilityDraftingBranchComponent', () => {
  let component: AssetLiabilityDraftingBranchComponent;
  let fixture: ComponentFixture<AssetLiabilityDraftingBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetLiabilityDraftingBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetLiabilityDraftingBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

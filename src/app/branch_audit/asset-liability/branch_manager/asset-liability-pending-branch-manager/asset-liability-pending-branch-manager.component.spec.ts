import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLiabilityPendingBranchManagerComponent } from './asset-liability-pending-branch-manager.component';

describe('AssetLiabilityPendingBranchManagerComponent', () => {
  let component: AssetLiabilityPendingBranchManagerComponent;
  let fixture: ComponentFixture<AssetLiabilityPendingBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetLiabilityPendingBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetLiabilityPendingBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

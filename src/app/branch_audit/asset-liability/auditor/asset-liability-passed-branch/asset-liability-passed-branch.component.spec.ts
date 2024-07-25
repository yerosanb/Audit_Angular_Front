import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLiabilityPassedBranchComponent } from './asset-liability-passed-branch.component';

describe('AssetLiabilityPassedBranchComponent', () => {
  let component: AssetLiabilityPassedBranchComponent;
  let fixture: ComponentFixture<AssetLiabilityPassedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetLiabilityPassedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetLiabilityPassedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

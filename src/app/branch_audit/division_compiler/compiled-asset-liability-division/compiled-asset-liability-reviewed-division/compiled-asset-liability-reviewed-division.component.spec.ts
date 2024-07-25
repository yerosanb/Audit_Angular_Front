import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledAssetLiabilityReviewedDivisionComponent } from './compiled-asset-liability-reviewed-division.component';

describe('CompiledAssetLiabilityReviewedDivisionComponent', () => {
  let component: CompiledAssetLiabilityReviewedDivisionComponent;
  let fixture: ComponentFixture<CompiledAssetLiabilityReviewedDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledAssetLiabilityReviewedDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledAssetLiabilityReviewedDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

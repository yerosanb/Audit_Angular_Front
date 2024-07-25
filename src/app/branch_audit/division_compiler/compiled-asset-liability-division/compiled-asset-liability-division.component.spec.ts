import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledAssetLiabilityDivisionComponent } from './compiled-asset-liability-division.component';

describe('CompiledAssetLiabilityDivisionComponent', () => {
  let component: CompiledAssetLiabilityDivisionComponent;
  let fixture: ComponentFixture<CompiledAssetLiabilityDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledAssetLiabilityDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledAssetLiabilityDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

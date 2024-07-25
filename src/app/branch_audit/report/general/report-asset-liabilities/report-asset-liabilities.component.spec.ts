import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAssetLiabilitiesComponent } from './report-asset-liabilities.component';

describe('ReportAssetLiabilitiesComponent', () => {
  let component: ReportAssetLiabilitiesComponent;
  let fixture: ComponentFixture<ReportAssetLiabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAssetLiabilitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAssetLiabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetLiabilityCreatEditComponent } from './asset-liability-creat-edit.component';

describe('AssetLiabilityCreatEditComponent', () => {
  let component: AssetLiabilityCreatEditComponent;
  let fixture: ComponentFixture<AssetLiabilityCreatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetLiabilityCreatEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetLiabilityCreatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

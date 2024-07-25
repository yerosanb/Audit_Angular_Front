import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbnormalBalanceDraftingBranchComponent } from './abnormal-balance-drafting-branch.component';

describe('AbnormalBalanceDraftingBranchComponent', () => {
  let component: AbnormalBalanceDraftingBranchComponent;
  let fixture: ComponentFixture<AbnormalBalanceDraftingBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbnormalBalanceDraftingBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbnormalBalanceDraftingBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

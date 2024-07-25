import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatioalDescripancyDraftingAuditorBranchComponent } from './operatioal-descripancy-drafting-auditor-branch.component';

describe('OperatioalDescripancyDraftingAuditorBranchComponent', () => {
  let component: OperatioalDescripancyDraftingAuditorBranchComponent;
  let fixture: ComponentFixture<OperatioalDescripancyDraftingAuditorBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatioalDescripancyDraftingAuditorBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatioalDescripancyDraftingAuditorBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

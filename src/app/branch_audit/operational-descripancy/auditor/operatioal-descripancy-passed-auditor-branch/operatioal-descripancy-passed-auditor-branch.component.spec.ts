import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatioalDescripancyPassedAuditorBranchComponent } from './operatioal-descripancy-passed-auditor-branch.component';

describe('OperatioalDescripancyPassedAuditorBranchComponent', () => {
  let component: OperatioalDescripancyPassedAuditorBranchComponent;
  let fixture: ComponentFixture<OperatioalDescripancyPassedAuditorBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatioalDescripancyPassedAuditorBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatioalDescripancyPassedAuditorBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

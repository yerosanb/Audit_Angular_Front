import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorandomContingentReportedBranchManagerComponent } from './memorandom-contingent-reported-branch-manager.component';

describe('MemorandomContingentReportedBranchManagerComponent', () => {
  let component: MemorandomContingentReportedBranchManagerComponent;
  let fixture: ComponentFixture<MemorandomContingentReportedBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemorandomContingentReportedBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemorandomContingentReportedBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

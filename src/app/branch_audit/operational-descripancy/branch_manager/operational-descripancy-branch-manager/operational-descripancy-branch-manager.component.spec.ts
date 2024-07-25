import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalDescripancyBranchManagerComponent } from './operational-descripancy-branch-manager.component';

describe('OperationalDescripancyBranchManagerComponent', () => {
  let component: OperationalDescripancyBranchManagerComponent;
  let fixture: ComponentFixture<OperationalDescripancyBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalDescripancyBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalDescripancyBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

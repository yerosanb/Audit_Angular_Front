import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormantInactiveAccountPassedBranchComponent } from './dormant-inactive-account-passed-branch.component';

describe('DormantInactiveAccountPassedBranchComponent', () => {
  let component: DormantInactiveAccountPassedBranchComponent;
  let fixture: ComponentFixture<DormantInactiveAccountPassedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormantInactiveAccountPassedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormantInactiveAccountPassedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenseAccountPassedBranchComponent } from './suspense-account-passed-branch.component';

describe('SuspenseAccountPassedBranchComponent', () => {
  let component: SuspenseAccountPassedBranchComponent;
  let fixture: ComponentFixture<SuspenseAccountPassedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspenseAccountPassedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspenseAccountPassedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

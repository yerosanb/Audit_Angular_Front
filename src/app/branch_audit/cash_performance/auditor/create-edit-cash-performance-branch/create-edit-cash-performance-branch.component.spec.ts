import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCashPerformanceBranchComponent } from './create-edit-cash-performance-branch.component';

describe('CreateEditCashPerformanceBranchComponent', () => {
  let component: CreateEditCashPerformanceBranchComponent;
  let fixture: ComponentFixture<CreateEditCashPerformanceBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditCashPerformanceBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditCashPerformanceBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

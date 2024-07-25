import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCountCreatEditBranchComponent } from './cash-count-creat-edit-branch.component';

describe('CashCountCreatEditBranchComponent', () => {
  let component: CashCountCreatEditBranchComponent;
  let fixture: ComponentFixture<CashCountCreatEditBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashCountCreatEditBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashCountCreatEditBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

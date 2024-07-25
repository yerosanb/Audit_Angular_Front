import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongOutstandingItemBranchManagerComponent } from './long-outstanding-item-branch-manager.component';

describe('LongOutstandingItemBranchManagerComponent', () => {
  let component: LongOutstandingItemBranchManagerComponent;
  let fixture: ComponentFixture<LongOutstandingItemBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongOutstandingItemBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongOutstandingItemBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

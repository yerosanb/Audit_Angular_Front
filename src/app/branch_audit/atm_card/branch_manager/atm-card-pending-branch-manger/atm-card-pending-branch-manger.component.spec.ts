import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmCardPendingBranchMangerComponent } from './atm-card-pending-branch-manger.component';

describe('AtmCardPendingBranchMangerComponent', () => {
  let component: AtmCardPendingBranchMangerComponent;
  let fixture: ComponentFixture<AtmCardPendingBranchMangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtmCardPendingBranchMangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtmCardPendingBranchMangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

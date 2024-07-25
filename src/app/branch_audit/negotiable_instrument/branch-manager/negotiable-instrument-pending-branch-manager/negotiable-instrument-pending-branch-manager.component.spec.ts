import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiableInstrumentPendingBranchManagerComponent } from './negotiable-instrument-pending-branch-manager.component';

describe('NegotiableInstrumentPendingBranchManagerComponent', () => {
  let component: NegotiableInstrumentPendingBranchManagerComponent;
  let fixture: ComponentFixture<NegotiableInstrumentPendingBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegotiableInstrumentPendingBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegotiableInstrumentPendingBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

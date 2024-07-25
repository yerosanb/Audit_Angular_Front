import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiableInstrumentPassedBranchComponent } from './negotiable-instrument-passed-branch.component';

describe('NegotiableInstrumentPassedBranchComponent', () => {
  let component: NegotiableInstrumentPassedBranchComponent;
  let fixture: ComponentFixture<NegotiableInstrumentPassedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegotiableInstrumentPassedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegotiableInstrumentPassedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

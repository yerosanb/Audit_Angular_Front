import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiableInstrumentDraftingBranchComponent } from './negotiable-instrument-drafting-branch.component';

describe('NegotiableInstrumentDraftingBranchComponent', () => {
  let component: NegotiableInstrumentDraftingBranchComponent;
  let fixture: ComponentFixture<NegotiableInstrumentDraftingBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegotiableInstrumentDraftingBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegotiableInstrumentDraftingBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

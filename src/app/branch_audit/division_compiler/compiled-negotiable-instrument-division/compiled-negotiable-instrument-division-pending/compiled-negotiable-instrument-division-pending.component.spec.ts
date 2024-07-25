import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledNegotiableInstrumentDivisionPendingComponent } from './compiled-negotiable-instrument-division-pending.component';

describe('CompiledNegotiableInstrumentDivisionPendingComponent', () => {
  let component: CompiledNegotiableInstrumentDivisionPendingComponent;
  let fixture: ComponentFixture<CompiledNegotiableInstrumentDivisionPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledNegotiableInstrumentDivisionPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledNegotiableInstrumentDivisionPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

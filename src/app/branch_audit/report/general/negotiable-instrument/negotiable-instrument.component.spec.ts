import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiableInstrumentComponent } from './negotiable-instrument.component';

describe('NegotiableInstrumentComponent', () => {
  let component: NegotiableInstrumentComponent;
  let fixture: ComponentFixture<NegotiableInstrumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegotiableInstrumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegotiableInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

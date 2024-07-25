import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiableInstrumentCreateEditComponent } from './negotiable-instrument-create-edit.component';

describe('NegotiableInstrumentCreateEditComponent', () => {
  let component: NegotiableInstrumentCreateEditComponent;
  let fixture: ComponentFixture<NegotiableInstrumentCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegotiableInstrumentCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegotiableInstrumentCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

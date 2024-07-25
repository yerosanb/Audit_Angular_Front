import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalDescripancyPendingRegionalComponent } from './operational-descripancy-pending-regional.component';

describe('OperationalDescripancyPendingRegionalComponent', () => {
  let component: OperationalDescripancyPendingRegionalComponent;
  let fixture: ComponentFixture<OperationalDescripancyPendingRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalDescripancyPendingRegionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalDescripancyPendingRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

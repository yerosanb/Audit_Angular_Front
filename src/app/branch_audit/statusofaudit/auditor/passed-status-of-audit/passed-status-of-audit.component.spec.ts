import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassedStatusOfAuditComponent } from './passed-status-of-audit.component';

describe('PassedStatusOfAuditComponent', () => {
  let component: PassedStatusOfAuditComponent;
  let fixture: ComponentFixture<PassedStatusOfAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassedStatusOfAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassedStatusOfAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

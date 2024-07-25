import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledCashManagementDivisionComponent } from './compiled-cash-management-division.component';

describe('CompiledCashManagementDivisionComponent', () => {
  let component: CompiledCashManagementDivisionComponent;
  let fixture: ComponentFixture<CompiledCashManagementDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledCashManagementDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledCashManagementDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

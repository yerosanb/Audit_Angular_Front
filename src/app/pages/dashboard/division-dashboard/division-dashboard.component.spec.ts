import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionDashboardComponent } from './division-dashboard.component';

describe('DivisionDashboardComponent', () => {
  let component: DivisionDashboardComponent;
  let fixture: ComponentFixture<DivisionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

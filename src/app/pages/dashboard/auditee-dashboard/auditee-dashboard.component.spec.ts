import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditeeDashboardComponent } from './auditee-dashboard.component';

describe('AuditeeDashboardComponent', () => {
  let component: AuditeeDashboardComponent;
  let fixture: ComponentFixture<AuditeeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditeeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

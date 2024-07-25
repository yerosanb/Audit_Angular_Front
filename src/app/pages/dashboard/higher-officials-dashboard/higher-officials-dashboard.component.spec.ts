import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherOfficialsDashboardComponent } from './higher-officials-dashboard.component';

describe('HigherOfficialsDashboardComponent', () => {
  let component: HigherOfficialsDashboardComponent;
  let fixture: ComponentFixture<HigherOfficialsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HigherOfficialsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HigherOfficialsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

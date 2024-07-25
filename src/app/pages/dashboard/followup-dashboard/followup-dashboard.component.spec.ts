import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupDashboardComponent } from './followup-dashboard.component';

describe('FollowupDashboardComponent', () => {
  let component: FollowupDashboardComponent;
  let fixture: ComponentFixture<FollowupDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowupDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowupDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

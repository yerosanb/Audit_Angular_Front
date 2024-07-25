import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkNotificationBranchComponent } from './remark-notification-branch.component';

describe('RemarkNotificationBranchComponent', () => {
  let component: RemarkNotificationBranchComponent;
  let fixture: ComponentFixture<RemarkNotificationBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarkNotificationBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemarkNotificationBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

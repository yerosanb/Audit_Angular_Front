import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSuspenseAccountReviewerComponent } from './pending-suspense-account-reviewer.component';

describe('PendingSuspenseAccountReviewerComponent', () => {
  let component: PendingSuspenseAccountReviewerComponent;
  let fixture: ComponentFixture<PendingSuspenseAccountReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingSuspenseAccountReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingSuspenseAccountReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenseAccountTypeManagementComponent } from './suspense-account-type-management.component';

describe('SuspenseAccountTypeManagementComponent', () => {
  let component: SuspenseAccountTypeManagementComponent;
  let fixture: ComponentFixture<SuspenseAccountTypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspenseAccountTypeManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspenseAccountTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

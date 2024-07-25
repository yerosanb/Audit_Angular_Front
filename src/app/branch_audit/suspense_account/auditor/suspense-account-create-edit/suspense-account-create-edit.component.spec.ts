import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenseAccountCreateEditComponent } from './suspense-account-create-edit.component';

describe('SuspenseAccountCreateEditComponent', () => {
  let component: SuspenseAccountCreateEditComponent;
  let fixture: ComponentFixture<SuspenseAccountCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspenseAccountCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspenseAccountCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

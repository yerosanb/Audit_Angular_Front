import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormantInactiveAccountCreateEditComponent } from './dormant-inactive-account-create-edit.component';

describe('DormantInactiveAccountCreateEditComponent', () => {
  let component: DormantInactiveAccountCreateEditComponent;
  let fixture: ComponentFixture<DormantInactiveAccountCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormantInactiveAccountCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormantInactiveAccountCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

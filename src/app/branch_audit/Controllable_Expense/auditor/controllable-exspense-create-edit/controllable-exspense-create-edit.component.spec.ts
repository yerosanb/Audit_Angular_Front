import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllableExspenseCreateEditComponent } from './controllable-exspense-create-edit.component';

describe('ControllableExspenseCreateEditComponent', () => {
  let component: ControllableExspenseCreateEditComponent;
  let fixture: ComponentFixture<ControllableExspenseCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllableExspenseCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllableExspenseCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

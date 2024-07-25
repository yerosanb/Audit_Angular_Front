import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalDescripancyCreateEditComponent } from './operational-descripancy-create-edit.component';

describe('OperationalDescripancyCreateEditComponent', () => {
  let component: OperationalDescripancyCreateEditComponent;
  let fixture: ComponentFixture<OperationalDescripancyCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalDescripancyCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalDescripancyCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

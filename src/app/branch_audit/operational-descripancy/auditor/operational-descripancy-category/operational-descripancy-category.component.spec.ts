import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalDescripancyCategoryComponent } from './operational-descripancy-category.component';

describe('OperationalDescripancyCategoryComponent', () => {
  let component: OperationalDescripancyCategoryComponent;
  let fixture: ComponentFixture<OperationalDescripancyCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalDescripancyCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalDescripancyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

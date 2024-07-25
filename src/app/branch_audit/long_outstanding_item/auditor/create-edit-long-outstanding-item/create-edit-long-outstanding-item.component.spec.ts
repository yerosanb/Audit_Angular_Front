import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditLongOutstandingItemComponent } from './create-edit-long-outstanding-item.component';

describe('CreateEditLongOutstandingItemComponent', () => {
  let component: CreateEditLongOutstandingItemComponent;
  let fixture: ComponentFixture<CreateEditLongOutstandingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditLongOutstandingItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditLongOutstandingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

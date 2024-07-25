import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongOutstandinItemComponent } from './long-outstandin-item.component';

describe('LongOutstandinItemComponent', () => {
  let component: LongOutstandinItemComponent;
  let fixture: ComponentFixture<LongOutstandinItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongOutstandinItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongOutstandinItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

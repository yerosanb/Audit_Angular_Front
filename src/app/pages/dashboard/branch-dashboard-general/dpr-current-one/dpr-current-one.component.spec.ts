import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DprCurrentOneComponent } from './dpr-current-one.component';

describe('DprCurrentOneComponent', () => {
  let component: DprCurrentOneComponent;
  let fixture: ComponentFixture<DprCurrentOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DprCurrentOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DprCurrentOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

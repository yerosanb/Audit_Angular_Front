import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdaCurrentThreeComponent } from './dda-current-three.component';

describe('DdaCurrentThreeComponent', () => {
  let component: DdaCurrentThreeComponent;
  let fixture: ComponentFixture<DdaCurrentThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdaCurrentThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DdaCurrentThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

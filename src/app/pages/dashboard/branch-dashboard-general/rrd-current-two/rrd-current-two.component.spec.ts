import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrdCurrentTwoComponent } from './rrd-current-two.component';

describe('RrdCurrentTwoComponent', () => {
  let component: RrdCurrentTwoComponent;
  let fixture: ComponentFixture<RrdCurrentTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrdCurrentTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrdCurrentTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

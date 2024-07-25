import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RprpfFiveComponent } from './rprpf-five.component';

describe('RprpfFiveComponent', () => {
  let component: RprpfFiveComponent;
  let fixture: ComponentFixture<RprpfFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RprpfFiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RprpfFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

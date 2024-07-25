import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdaTotalFourComponent } from './prda-total-four.component';

describe('PrdaTotalFourComponent', () => {
  let component: PrdaTotalFourComponent;
  let fixture: ComponentFixture<PrdaTotalFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrdaTotalFourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrdaTotalFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

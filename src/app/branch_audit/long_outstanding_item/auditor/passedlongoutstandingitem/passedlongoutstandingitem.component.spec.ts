import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassedlongoutstandingitemComponent } from './passedlongoutstandingitem.component';

describe('PassedlongoutstandingitemComponent', () => {
  let component: PassedlongoutstandingitemComponent;
  let fixture: ComponentFixture<PassedlongoutstandingitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassedlongoutstandingitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassedlongoutstandingitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

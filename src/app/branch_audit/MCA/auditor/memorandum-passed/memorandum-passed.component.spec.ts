import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorandumPassedComponent } from './memorandum-passed.component';

describe('MemorandumPassedComponent', () => {
  let component: MemorandumPassedComponent;
  let fixture: ComponentFixture<MemorandumPassedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemorandumPassedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemorandumPassedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

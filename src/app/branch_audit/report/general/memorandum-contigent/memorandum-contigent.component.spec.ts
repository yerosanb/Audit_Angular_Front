import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorandumContigentComponent } from './memorandum-contigent.component';

describe('MemorandumContigentComponent', () => {
  let component: MemorandumContigentComponent;
  let fixture: ComponentFixture<MemorandumContigentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemorandumContigentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemorandumContigentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

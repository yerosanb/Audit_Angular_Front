import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorandomCreateEditComponent } from './memorandom-create-edit.component';

describe('MemorandomCreateEditComponent', () => {
  let component: MemorandomCreateEditComponent;
  let fixture: ComponentFixture<MemorandomCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemorandomCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemorandomCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

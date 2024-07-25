import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmCardCreateEditComponent } from './atm-card-create-edit.component';

describe('AtmCardCreateEditComponent', () => {
  let component: AtmCardCreateEditComponent;
  let fixture: ComponentFixture<AtmCardCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtmCardCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtmCardCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

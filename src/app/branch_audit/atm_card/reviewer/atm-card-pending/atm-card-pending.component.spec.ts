import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmCardPendingComponent } from './atm-card-pending.component';

describe('AtmCardPendingComponent', () => {
  let component: AtmCardPendingComponent;
  let fixture: ComponentFixture<AtmCardPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtmCardPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtmCardPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

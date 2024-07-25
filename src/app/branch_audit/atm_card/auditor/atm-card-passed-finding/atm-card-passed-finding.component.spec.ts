import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmCardPassedFindingComponent } from './atm-card-passed-finding.component';

describe('AtmCardPassedFindingComponent', () => {
  let component: AtmCardPassedFindingComponent;
  let fixture: ComponentFixture<AtmCardPassedFindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtmCardPassedFindingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtmCardPassedFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

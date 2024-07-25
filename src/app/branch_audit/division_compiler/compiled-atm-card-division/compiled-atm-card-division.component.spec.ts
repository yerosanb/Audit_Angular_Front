import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledAtmCardDivisionComponent } from './compiled-atm-card-division.component';

describe('CompiledAtmCardDivisionComponent', () => {
  let component: CompiledAtmCardDivisionComponent;
  let fixture: ComponentFixture<CompiledAtmCardDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledAtmCardDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledAtmCardDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

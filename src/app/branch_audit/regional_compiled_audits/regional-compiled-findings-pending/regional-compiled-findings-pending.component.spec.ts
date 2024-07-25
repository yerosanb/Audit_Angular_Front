import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalCompiledFindingsPendingComponent } from './regional-compiled-findings-pending.component';

describe('RegionalCompiledFindingsPendingComponent', () => {
  let component: RegionalCompiledFindingsPendingComponent;
  let fixture: ComponentFixture<RegionalCompiledFindingsPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionalCompiledFindingsPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionalCompiledFindingsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

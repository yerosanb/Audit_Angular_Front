import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledAuditsProgressDivisionComponent } from './compiled-audits-progress-division.component';

describe('CompiledAuditsProgressDivisionComponent', () => {
  let component: CompiledAuditsProgressDivisionComponent;
  let fixture: ComponentFixture<CompiledAuditsProgressDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledAuditsProgressDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledAuditsProgressDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

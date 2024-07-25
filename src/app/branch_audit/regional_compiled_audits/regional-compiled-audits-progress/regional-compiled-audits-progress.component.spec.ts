import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalCompiledAuditsProgressComponent } from './regional-compiled-audits-progress.component';

describe('RegionalCompiledAuditsProgressComponent', () => {
  let component: RegionalCompiledAuditsProgressComponent;
  let fixture: ComponentFixture<RegionalCompiledAuditsProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionalCompiledAuditsProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionalCompiledAuditsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

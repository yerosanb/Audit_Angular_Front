import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompileBranchAuditsComponent } from './compile-branch-audits.component';

describe('CompileBranchAuditsComponent', () => {
  let component: CompileBranchAuditsComponent;
  let fixture: ComponentFixture<CompileBranchAuditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompileBranchAuditsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompileBranchAuditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

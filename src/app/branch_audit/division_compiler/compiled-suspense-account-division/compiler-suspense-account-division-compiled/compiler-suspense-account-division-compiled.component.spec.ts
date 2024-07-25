import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilerSuspenseAccountDivisionCompiledComponent } from './compiler-suspense-account-division-compiled.component';

describe('CompilerSuspenseAccountDivisionCompiledComponent', () => {
  let component: CompilerSuspenseAccountDivisionCompiledComponent;
  let fixture: ComponentFixture<CompilerSuspenseAccountDivisionCompiledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompilerSuspenseAccountDivisionCompiledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompilerSuspenseAccountDivisionCompiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

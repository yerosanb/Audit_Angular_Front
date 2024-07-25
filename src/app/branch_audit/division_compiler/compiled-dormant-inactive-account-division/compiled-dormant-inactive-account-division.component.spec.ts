import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledDormantInactiveAccountDivisionComponent } from './compiled-dormant-inactive-account-division.component';

describe('CompiledDormantInactiveAccountDivisionComponent', () => {
  let component: CompiledDormantInactiveAccountDivisionComponent;
  let fixture: ComponentFixture<CompiledDormantInactiveAccountDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledDormantInactiveAccountDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledDormantInactiveAccountDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

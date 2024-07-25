import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledSuspenseAccountDivisionPendingComponent } from './compiled-suspense-account-division-pending.component';

describe('CompiledSuspenseAccountDivisionPendingComponent', () => {
  let component: CompiledSuspenseAccountDivisionPendingComponent;
  let fixture: ComponentFixture<CompiledSuspenseAccountDivisionPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledSuspenseAccountDivisionPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledSuspenseAccountDivisionPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

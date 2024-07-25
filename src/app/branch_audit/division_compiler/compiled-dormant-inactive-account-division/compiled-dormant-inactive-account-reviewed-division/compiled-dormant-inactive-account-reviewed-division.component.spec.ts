import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledDormantInactiveAccountReviewedDivisionComponent } from './compiled-dormant-inactive-account-reviewed-division.component';

describe('CompiledDormantInactiveAccountReviewedDivisionComponent', () => {
  let component: CompiledDormantInactiveAccountReviewedDivisionComponent;
  let fixture: ComponentFixture<CompiledDormantInactiveAccountReviewedDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledDormantInactiveAccountReviewedDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledDormantInactiveAccountReviewedDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

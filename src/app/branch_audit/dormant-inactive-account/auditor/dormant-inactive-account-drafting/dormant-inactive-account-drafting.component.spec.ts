import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormantInactiveAccountDraftingComponent } from './dormant-inactive-account-drafting.component';

describe('DormantInactiveAccountDraftingComponent', () => {
  let component: DormantInactiveAccountDraftingComponent;
  let fixture: ComponentFixture<DormantInactiveAccountDraftingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormantInactiveAccountDraftingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DormantInactiveAccountDraftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

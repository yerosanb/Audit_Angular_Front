import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorMemorandumDraftingComponent } from './auditor-memorandum-drafting.component';

describe('AuditorMemorandumDraftingComponent', () => {
  let component: AuditorMemorandumDraftingComponent;
  let fixture: ComponentFixture<AuditorMemorandumDraftingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorMemorandumDraftingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditorMemorandumDraftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

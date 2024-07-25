import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftedDetailComponent } from './drafted-detail.component';

describe('DraftedDetailComponent', () => {
  let component: DraftedDetailComponent;
  let fixture: ComponentFixture<DraftedDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftedDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

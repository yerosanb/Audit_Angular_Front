import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftedlongoutstandingitemComponent } from './draftedlongoutstandingitem.component';

describe('DraftedlongoutstandingitemComponent', () => {
  let component: DraftedlongoutstandingitemComponent;
  let fixture: ComponentFixture<DraftedlongoutstandingitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftedlongoutstandingitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftedlongoutstandingitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

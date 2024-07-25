import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAccountIncompleteDocumentComponent } from './report-account-incomplete-document.component';

describe('ReportAccountIncompleteDocumentComponent', () => {
  let component: ReportAccountIncompleteDocumentComponent;
  let fixture: ComponentFixture<ReportAccountIncompleteDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAccountIncompleteDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAccountIncompleteDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

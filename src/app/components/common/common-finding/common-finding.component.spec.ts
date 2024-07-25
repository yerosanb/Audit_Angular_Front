import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFindingComponent } from './common-finding.component';

describe('CommonFindingComponent', () => {
  let component: CommonFindingComponent;
  let fixture: ComponentFixture<CommonFindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonFindingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

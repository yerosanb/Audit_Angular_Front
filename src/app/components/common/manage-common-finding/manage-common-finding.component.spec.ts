import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommonFindingComponent } from './manage-common-finding.component';

describe('ManageCommonFindingComponent', () => {
  let component: ManageCommonFindingComponent;
  let fixture: ComponentFixture<ManageCommonFindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCommonFindingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCommonFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

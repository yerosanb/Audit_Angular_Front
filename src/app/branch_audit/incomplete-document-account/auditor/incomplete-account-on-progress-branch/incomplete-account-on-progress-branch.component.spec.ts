import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteAccountOnProgressBranchComponent } from './incomplete-account-on-progress-branch.component';

describe('IncompleteAccountOnProgressBranchComponent', () => {
  let component: IncompleteAccountOnProgressBranchComponent;
  let fixture: ComponentFixture<IncompleteAccountOnProgressBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteAccountOnProgressBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncompleteAccountOnProgressBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

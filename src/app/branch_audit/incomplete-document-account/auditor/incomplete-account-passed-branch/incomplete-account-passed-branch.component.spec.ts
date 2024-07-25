import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteAccountPassedBranchComponent } from './incomplete-account-passed-branch.component';

describe('IncompleteAccountPassedBranchComponent', () => {
  let component: IncompleteAccountPassedBranchComponent;
  let fixture: ComponentFixture<IncompleteAccountPassedBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteAccountPassedBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncompleteAccountPassedBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

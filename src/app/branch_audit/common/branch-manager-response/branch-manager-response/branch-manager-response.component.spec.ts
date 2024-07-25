import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchManagerResponseComponent } from './branch-manager-response.component';

describe('BranchManagerResponseComponent', () => {
  let component: BranchManagerResponseComponent;
  let fixture: ComponentFixture<BranchManagerResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchManagerResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchManagerResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

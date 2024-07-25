import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPoolingBranchComponent } from './data-pooling-branch.component';

describe('DataPoolingBranchComponent', () => {
  let component: DataPoolingBranchComponent;
  let fixture: ComponentFixture<DataPoolingBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPoolingBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPoolingBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledLongOutstandingDivisionComponent } from './compiled-long-outstanding-division.component';

describe('CompiledLongOutstandingDivisionComponent', () => {
  let component: CompiledLongOutstandingDivisionComponent;
  let fixture: ComponentFixture<CompiledLongOutstandingDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledLongOutstandingDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledLongOutstandingDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

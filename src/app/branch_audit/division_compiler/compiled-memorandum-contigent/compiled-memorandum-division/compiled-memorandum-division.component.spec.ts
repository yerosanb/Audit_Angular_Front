import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiledMemorandumDivisionComponent } from './compiled-memorandum-division.component';

describe('CompiledMemorandumDivisionComponent', () => {
  let component: CompiledMemorandumDivisionComponent;
  let fixture: ComponentFixture<CompiledMemorandumDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompiledMemorandumDivisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompiledMemorandumDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

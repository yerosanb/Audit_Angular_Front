import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtmCardDraftingFindingComponent } from './atm-card-drafting-finding.component';


describe('AtmCardDraftingFindingComponent', () => {
  let component: AtmCardDraftingFindingComponent;
  let fixture: ComponentFixture<AtmCardDraftingFindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtmCardDraftingFindingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtmCardDraftingFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

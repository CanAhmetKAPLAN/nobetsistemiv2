import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuanDurumu } from './puanDurumu';

describe('PuanDurumu', () => {
  let component: PuanDurumu;
  let fixture: ComponentFixture<PuanDurumu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuanDurumu],
    }).compileComponents();

    fixture = TestBed.createComponent(PuanDurumu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

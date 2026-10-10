import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DegisimIzin } from './degisim-izin';

describe('DegisimIzin', () => {
  let component: DegisimIzin;
  let fixture: ComponentFixture<DegisimIzin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DegisimIzin],
    }).compileComponents();

    fixture = TestBed.createComponent(DegisimIzin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

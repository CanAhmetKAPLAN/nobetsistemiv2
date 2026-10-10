import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Yonetim } from './yonetim';

describe('Yonetim', () => {
  let component: Yonetim;
  let fixture: ComponentFixture<Yonetim>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Yonetim],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Yonetim);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Grupekle } from './grupekle';

describe('Grupekle', () => {
  let component: Grupekle;
  let fixture: ComponentFixture<Grupekle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Grupekle],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Grupekle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Bildirimler } from './bildirimler';

describe('Bildirimler', () => {
  let component: Bildirimler;
  let fixture: ComponentFixture<Bildirimler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bildirimler],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Bildirimler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

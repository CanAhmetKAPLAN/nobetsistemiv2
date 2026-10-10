import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cizelge } from './cizelge';

describe('Cizelge', () => {
  let component: Cizelge;
  let fixture: ComponentFixture<Cizelge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cizelge],
    }).compileComponents();

    fixture = TestBed.createComponent(Cizelge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

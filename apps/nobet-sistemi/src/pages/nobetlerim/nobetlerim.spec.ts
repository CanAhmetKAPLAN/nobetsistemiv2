import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Nobetlerim } from './nobetlerim';

describe('Nobetlerim', () => {
  let component: Nobetlerim;
  let fixture: ComponentFixture<Nobetlerim>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nobetlerim],
    }).compileComponents();

    fixture = TestBed.createComponent(Nobetlerim);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

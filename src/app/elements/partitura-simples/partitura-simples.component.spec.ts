import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartituraSimplesComponent } from './partitura-simples.component';

describe('PartituraSimplesComponent', () => {
  let component: PartituraSimplesComponent;
  let fixture: ComponentFixture<PartituraSimplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartituraSimplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartituraSimplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

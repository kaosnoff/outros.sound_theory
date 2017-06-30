import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoTeclaComponent } from './piano-tecla.component';

describe('PianoTeclaComponent', () => {
  let component: PianoTeclaComponent;
  let fixture: ComponentFixture<PianoTeclaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PianoTeclaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PianoTeclaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

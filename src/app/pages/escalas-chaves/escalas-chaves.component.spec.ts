import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalasChavesComponent } from './escalas-chaves.component';

describe('EscalasChavesComponent', () => {
  let component: EscalasChavesComponent;
  let fixture: ComponentFixture<EscalasChavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalasChavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalasChavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

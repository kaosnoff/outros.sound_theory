import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalasEscalasComponent } from './escalas-escalas.component';

describe('EscalasEscalasComponent', () => {
  let component: EscalasEscalasComponent;
  let fixture: ComponentFixture<EscalasEscalasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalasEscalasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalasEscalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalasModosComponent } from './escalas-modos.component';

describe('EscalasModosComponent', () => {
  let component: EscalasModosComponent;
  let fixture: ComponentFixture<EscalasModosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalasModosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalasModosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

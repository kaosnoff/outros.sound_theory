import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaFiguraComponent } from './nota-figura.component';

describe('NotaFiguraComponent', () => {
  let component: NotaFiguraComponent;
  let fixture: ComponentFixture<NotaFiguraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaFiguraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaFiguraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

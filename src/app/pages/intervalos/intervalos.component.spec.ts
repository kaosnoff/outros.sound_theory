import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalosComponent } from './intervalos.component';

describe('IntervalosComponent', () => {
  let component: IntervalosComponent;
  let fixture: ComponentFixture<IntervalosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervalosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

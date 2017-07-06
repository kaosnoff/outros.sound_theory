import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartituraComponent } from './partitura.component';

describe('PartituraComponent', () => {
  let component: PartituraComponent;
  let fixture: ComponentFixture<PartituraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartituraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

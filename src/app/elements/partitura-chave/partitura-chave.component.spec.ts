import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartituraChaveComponent } from './partitura-chave.component';

describe('PartituraChaveComponent', () => {
  let component: PartituraChaveComponent;
  let fixture: ComponentFixture<PartituraChaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartituraChaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartituraChaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

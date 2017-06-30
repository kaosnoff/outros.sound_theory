import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcordesComponent } from './acordes.component';

describe('AcordesComponent', () => {
  let component: AcordesComponent;
  let fixture: ComponentFixture<AcordesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcordesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcordesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

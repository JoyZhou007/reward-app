import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PKComponent } from './pk.component';

describe('PKComponent', () => {
  let component: PKComponent;
  let fixture: ComponentFixture<PKComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PKComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

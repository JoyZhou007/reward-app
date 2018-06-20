import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewordDetailComponent } from './reword-detail.component';

describe('RewordDetailComponent', () => {
  let component: RewordDetailComponent;
  let fixture: ComponentFixture<RewordDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewordDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewordDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

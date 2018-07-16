import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallAppBarComponent } from './install-app-bar.component';

describe('InstallAppBarComponent', () => {
  let component: InstallAppBarComponent;
  let fixture: ComponentFixture<InstallAppBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallAppBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallAppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

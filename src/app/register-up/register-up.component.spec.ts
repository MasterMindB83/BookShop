import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUpComponent } from './register-up.component';

describe('RegisterUpComponent', () => {
  let component: RegisterUpComponent;
  let fixture: ComponentFixture<RegisterUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

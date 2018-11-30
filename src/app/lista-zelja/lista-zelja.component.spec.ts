import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaZeljaComponent } from './lista-zelja.component';

describe('ListaZeljaComponent', () => {
  let component: ListaZeljaComponent;
  let fixture: ComponentFixture<ListaZeljaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaZeljaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaZeljaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

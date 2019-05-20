import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadoPage } from './chamado.page';

describe('ChamadoPage', () => {
  let component: ChamadoPage;
  let fixture: ComponentFixture<ChamadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

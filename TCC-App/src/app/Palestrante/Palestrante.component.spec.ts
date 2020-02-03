/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PalestranteComponent } from './Palestrante.component';

describe('PalestranteComponent', () => {
  let component: PalestranteComponent;
  let fixture: ComponentFixture<PalestranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalestranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalestranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

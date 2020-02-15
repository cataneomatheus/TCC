/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsultaService } from './consulta.service';

describe('Service: Consulta', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultaService]
    });
  });

  it('should ...', inject([ConsultaService], (service: ConsultaService) => {
    expect(service).toBeTruthy();
  }));
});

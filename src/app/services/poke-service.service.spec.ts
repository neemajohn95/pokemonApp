import { TestBed } from '@angular/core/testing';

import { PokeServiceService } from './poke-service.service';
import { CardModule, } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';

describe('PokeServiceService', () => {
  let service: PokeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      CardModule,
      ButtonModule,
      PaginatorModule,
      InputTextModule,
      DropdownModule,
      FieldsetModule,
      TableModule,
      ProgressSpinnerModule,
    ],
    providers: [PokeServiceService]});
    service = TestBed.inject(PokeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

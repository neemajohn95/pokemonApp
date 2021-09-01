import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable,of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface QueryParams {
  query?: any;
  page: number;
  pageSize: number;
  orderBy: string;
}

@Injectable({
  providedIn: 'root'
})

export class PokeServiceService {

  private baseUrl = environment.apiUrl;
 
  constructor(private _http: HttpClient) { }
   
  getList(req:QueryParams): Observable<any> {
    const params = new HttpParams({
      fromString: `limit=${req.pageSize}&offset=${req.page}`,
    });

    return this._http.get(this.baseUrl,{params});
  }


  getPokemonDetails(url:any){
    return this._http.get(url);
  }
}

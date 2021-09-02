import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface QueryParams {
  query?: any;
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})

export class PokeServiceService {

  private baseUrl = environment.apiUrl;
 public cardDetails :any;
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

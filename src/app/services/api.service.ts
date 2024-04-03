import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {filter, Observable, tap} from "rxjs";
import {KlinesRequest} from "../interfaces/klines";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * GET request base implementation
   *
   * @param url
   * @param options
   */
  get(url: string, options: object = {}): Observable<any> {
    const opts = {
      ...options,
    };

    return this.http.get(url, opts);
  }

  /**
   * POST request base implementation
   *
   * @param url
   * @param options
   */
  post(url: string, options: object = {}): Observable<any> {
    const opts = {
      ...options,
    };

    return this.http.post(url, opts);
  }

  public getKlinesData(options: KlinesRequest) {
    return this.get(`https://api.binance.com/api/v3/klines`, {params: options})
  }
}

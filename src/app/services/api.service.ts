import { HttpClient, HttpEvent, HttpParams, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { productData } from '../products/model/products-model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api:string;
  constructor(private httpClient: HttpClient) {
    this.api='https://fakestoreapi.com/products';
   }
  
  public getProducts(): Observable<Array<productData>> {
    return this.httpClient.get<Array<productData>>(this.api);
  }
  public searchProducts(query:string | null | undefined): Observable<Array<productData>> {
    return this.httpClient.get<Array<productData>>(`${this.api}/search?q=${query}`);
  }
  public getSingleProducts(id:string | null | undefined): Observable<productData> {
    return this.httpClient.get<productData>(`${this.api}/${id}`);
  }
  public addProduct(data:any): Observable<productData> {
    return this.httpClient.post<productData>(this.api,data);
  }

  public getCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(`${this.api}/categories`);
  }
  public getProductsWithCategory(category:string): Observable<Array<productData>> {
    return this.httpClient.get<Array<productData>>(`${this.api}/category/${category}`);
  }

  public getProductsWithLImit(limit:number,skip:number): Observable<Array<productData>> {
    let url = `${this.api}?limit=${limit}`;
    if (skip) {
      url += `&skip=${skip}`;
    }
    return this.httpClient.get<Array<productData>>(url);
  }

  public deleteProduct(id:number): Observable<Array<productData>> {
    return this.httpClient.delete<Array<productData>>(`${this.api}/${id}`);
  }
  
  
}

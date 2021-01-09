import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InformationeService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "https://fashion-shopping-server.herokuapp.com/main/"
  products: any

  getProductsByCategory(categoryId) {
    return this.http.get(this.baseUrl + categoryId)
  }

  tempPriceByProduct(text) {
    return this.http.get(this.baseUrl + "search/" + text)
  }

}

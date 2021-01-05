import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:1000/admin"
  editProduct: any

  addProduct(body) {
    return this.http.post(this.baseUrl + '/add_product', body, {
      headers: {
        "content-type": "application/json"
        // "Authorization": localStorage.token
      }
    })
  }

  edit_product(body) {
    return this.http.put(this.baseUrl + '/edit_product/' + this.editProduct._id, body, {
      headers: {
        "content-type": "application/json"
        // "Authorization": localStorage.token
      }
    })
  }



}

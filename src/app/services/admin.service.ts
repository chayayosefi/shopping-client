import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:1000/admin"
  editProduct: any
  sideNav: boolean = false
  checkAddOrEdit: boolean = false

  addProduct(body) {
    return this.http.post(this.baseUrl + '/add_product', body, {
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }

  edit_product(body) {
    return this.http.put(this.baseUrl + '/edit_product/' + this.editProduct._id, body, {
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }

  change(button, p) {
    if (button === 'edit') {
      this.checkAddOrEdit = true
      this.editProduct = p
    } else {
      this.checkAddOrEdit = false
    }
    this.sideNav = !this.sideNav
    if (!this.sideNav && this.checkAddOrEdit) {
      this.checkAddOrEdit = false
    }
  }


}

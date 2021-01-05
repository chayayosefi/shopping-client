import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private r: Router
  ) { }

  admin: boolean = false
  loggedUser: any
  baseUrl: string = "http://localhost:1000/user"
  cart: any
  cartExist: boolean = false
  login: boolean
  msg: any
  value: any

  existCart(userId) {
    return this.http.get(this.baseUrl + '/check_cart/' + userId)
  }

  addOrRemoveProduct(body) {
    return this.http.put(this.baseUrl + '/addOrRemoveProductFromCart', JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  openCart(body) {
    return this.http.post(this.baseUrl + '/open_cart', JSON.stringify(body), {
      headers: {
        "content-type": "application/json"
        // "Authorization": localStorage.token
      }
    })
  }

  deleteProductFromCart(body) {
    return this.http.put(this.baseUrl + '/deleteProductFromCart', JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  deleteProductsFromCart(body) {
    return this.http.put(this.baseUrl + '/deleteProductsFromCart', JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  deleteCart(id) {
    return this.http.put(this.baseUrl + '/delete_cart/' + id, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  openOrder(body) {
    return this.http.post(this.baseUrl + '/open_order', JSON.stringify(body), {
      headers: {
        "content-type": "application/json"
        // "Authorization": localStorage.token
      }
    })
  }

  checkCart() {
    this.existCart(this.loggedUser[0]._id).subscribe(
      (res: any) => {
        if (res.msg == "There is no active cart") {
          //   if (this.cartExist) {

          //     this.msg = "Your last purchase was in:"
          //     this.value = "Start shopping"
          //     this.login = true

          //   }
          // } else {
          this.msg = "Welcome " + this.loggedUser[0].f_name + " !"
          this.value = "Start shopping"
          this.login = true
        } else {
          this.cart = res.msg[0]
          this.msg = "There is an active cart from date:" + moment(this.cart.creationDate).format('DD/MM/YYYY') + " and final price:" + this.cart.finalPrice + "$"
          this.value = "Continue shopping"
          this.cartExist = true
          this.login = true
        }
      }
    )
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("date")
    localStorage.removeItem("user")
    this.admin = false
    this.login = undefined
    this.msg = undefined
    this.loggedUser = undefined
    this.r.navigateByUrl('/login')
  }


}

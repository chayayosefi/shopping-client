import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient,
    public us: UserService
  ) { }

  baseUrl: string = "https://fashion-shopping-server.herokuapp.com/actions"
  allProducts: any
  productInCart: any = []
  allCategories: any

  login(body) {
    return this.http.post(this.baseUrl + '/login', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  register(body) {
    return this.http.post(this.baseUrl + '/register', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  registerB(body) {
    return this.http.post(this.baseUrl + '/registerB', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  getAllNumProducts() {
    return this.http.get(this.baseUrl + '/allProducts')
  }

  getAllOrders() {
    return this.http.get(this.baseUrl + '/allOrders')
  }

  getAllCategory() {
    return this.http.get(this.baseUrl + '/allCategory')
  }



  getAllProducts() {
    return this.http.get(this.baseUrl + '/products/all')
  }

  getAllProductsByCart() {
    this.getAllProducts().subscribe(
      (res: any) => {
        if (this.us.cart === undefined) {
          return
        }
        this.allProducts = res
        this.productInCart = this.allProducts.filter(p => this.us.cart.products.some(p_id => p_id.productId == p._id))
        for (let i = 0; i < this.productInCart.length; i++) {
          for (let j = 0; j < this.us.cart.products.length; j++) {
            if (this.productInCart[i]._id == this.us.cart.products[j].productId) {
              this.productInCart[i].quantity_in_cart = this.us.cart.products[j].quantity
            }
          }

        }
      }
    )
  }

  checkDeliveryDate(deliveryDate) {
    return this.http.get(this.baseUrl + '/allCountDate/' + deliveryDate)
  }
}

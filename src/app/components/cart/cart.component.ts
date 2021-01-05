import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    public us: UserService,
    public ss: ServiceService,
    private r: Router
  ) { }

  body: any

  ngOnInit(): void {
    this.ss.getAllProductsByCart()
  }

  productUpdate(quantity, p) {
    this.body = { cart_id: this.us.cart._id, productId: p._id, quantity, priceByProduct: (p.price * quantity) }
    this.us.addOrRemoveProduct(this.body).subscribe(
      (res: any) => {
        this.us.cart = res.answer
        this.ss.getAllProductsByCart()
      }
    )
  }

  productDelete(p) {
    this.body = { cart_id: this.us.cart._id, productId: p._id, priceByProduct: (p.quantity_in_cart * p.price) }
    this.us.deleteProductFromCart(this.body).subscribe(
      (res: any) => {
        this.us.cart = res.answer
        this.ss.getAllProductsByCart()
      }
    )
  }

  productsDelete() {
    this.body = { cart_id: this.us.cart._id }
    this.us.deleteProductsFromCart(this.body).subscribe(
      (res: any) => {
        this.us.cart = res.answer
        this.ss.getAllProductsByCart()
      }
    )
  }

}

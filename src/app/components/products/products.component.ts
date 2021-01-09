import { Component, OnInit } from '@angular/core';
import { InformationeService } from 'src/app/services/informatione.service';
import { ServiceService } from 'src/app/services/service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    public is: InformationeService,
    public ss: ServiceService,
    public dialog: MatDialog,
    public us: UserService,
    public as: AdminService
  ) { }

  cattegory_id: any
  body: any

  ngOnInit(): void {
    this.ss.getAllCategory().subscribe(
      res => {
        this.ss.allCategories = res
        this.getProByCategory("5ff9da2552c72c77fce082a0")
      })
  }

  getProByCategory(id) {
    this.is.getProductsByCategory(id).subscribe(
      res => {
        this.is.products = res
      }
    )
  }

  openDialog(product) {
    if (this.us.cart === undefined) {
      this.us.openCart({ id: this.us.loggedUser[0]._id }).subscribe(
        (res: any) => {
          this.us.cart = res.nc
        })
    }
    this.us.checkCart()
    const dialogRef = this.dialog.open(DialogComponent)
    dialogRef.afterClosed().subscribe(
      (res: any) => {
        let temp = this.us.cart.products.filter(p => p.productId == product._id)
        if (temp.length > 0) {
          this.body = { cart_id: this.us.cart._id, productId: product._id, quantity: res + temp[0].quantity, priceByProduct: (product.price * res) + temp[0].priceByProduct }
        } else {
          this.body = { cart_id: this.us.cart._id, productId: product._id, quantity: res, priceByProduct: product.price * res }

        }
        this.us.addOrRemoveProduct(this.body).subscribe(
          (res: any) => {
            this.us.cart = res.answer
            this.ss.getAllProductsByCart()
          }
        )
      }
    )

  }

  
}

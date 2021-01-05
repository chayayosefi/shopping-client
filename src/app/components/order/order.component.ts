import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogOrderComponent } from 'src/app/components/dialog-order/dialog-order.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public us: UserService,
    public ss: ServiceService,
    public dialog: MatDialog,
    private r: Router
  ) { }

  details: FormGroup
  today: any
  pattern: any = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
  msg: any
  body: any

  ngOnInit(): void {
    if (this.us.loggedUser === undefined) {
      alert("The user is not logged in")
      this.r.navigateByUrl('/login')
    }
    this.details = this.fb.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      creditCard: ['', Validators.required]
    })
    this.today = new Date().toISOString().split('T')[0];
  }

  handleSubmit() {
    if (this.details.value.creditCard.match(this.pattern)) {
      this.ss.checkDeliveryDate(this.details.value.deliveryDate).subscribe(
        (res: any) => {
          if (!res.msg) {
            this.msg = "You must select another day for delivery, this date is busy"
          } else {
            this.body = {
              userId: this.us.cart.userId, cartId: this.us.cart._id, finalPrice: this.us.cart.finalPrice,
              city: this.details.value.city, street: this.details.value.street, deliveryDate: this.details.value.deliveryDate,
              last4DigitsOfCredit: this.details.value.creditCard.slice(-4)
            }
            this.us.openOrder(this.body).subscribe(
              (res: any) => {
                // console.log(res)
                if (!res.error) {
                  this.openDialog()
                }
              }
            )
          }
        })
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogOrderComponent)

    dialogRef.afterClosed().subscribe(
      (res: any) => {
        // console.log(`Dialog result: ${res}`);
      });
  }


  city() {
    this.details.controls.city.setValue(this.us.loggedUser[0].city)
  }

  street() {
    this.details.controls.street.setValue(this.us.loggedUser[0].street)
  }
}

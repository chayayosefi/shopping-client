import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.css']
})
export class DialogOrderComponent implements OnInit {

  constructor(public us: UserService, public ss: ServiceService) { }


  ngOnInit(): void {
  }

  deletCart() {
    this.us.deleteCart(this.us.cart._id).subscribe(
      res => {
        this.us.cart = undefined
        this.ss.productInCart = []
      }
    )
  }

  generateReceipt() {
    console.log(this.ss.productInCart)
    let temp = ""
    for (let i = 0; i < this.ss.productInCart.length; i++) {
      temp += this.ss.productInCart[i].name +" "+ this.ss.productInCart[i].price +" "+ this.ss.productInCart[i].quantity_in_cart
    }
    // let receipt="this.ss.productInCart
    const printContent = temp;
    let win = window.open('', 'printwindow', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    win.document.write('<base href="' + location.origin + location.pathname + '">');
    win.document.write('<link rel="stylesheet" href="./cash-register.component.scss">');
    win.document.write('<style type="text/css">.style{width:100%}</style>');
    win.document.write(printContent);
    win.document.write('</body></html>');
    win.print();
    win.close();
  }

}

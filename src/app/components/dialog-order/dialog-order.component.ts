import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.css']
})
export class DialogOrderComponent implements OnInit {

  constructor(public us: UserService, public ss: ServiceService, public r: Router) { }


  ngOnInit(): void {
  }

  deleteCart() {
    this.us.deleteCart(this.us.cart._id).subscribe(
      (res: any) => {
        this.us.cart = undefined
        this.us.cartExist = false
        this.ss.productInCart = []
        this.r.navigateByUrl('/store')

      }
    )
  }

  generateReceipt() {
    let element = document.getElementById('table')
    html2canvas(element).then((canvas) => {
      let imgData = canvas.toDataURL('image/png')
      let doc = new jsPDF()
      let imageHeight = canvas.height * 208 / canvas.width
      doc.addImage(imgData, 0, 0, 208, imageHeight)
      doc.save("image.pdf")

    })
  }


}

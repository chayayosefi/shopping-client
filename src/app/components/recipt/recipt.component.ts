import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment'

@Component({
  selector: 'app-recipt',
  templateUrl: './recipt.component.html',
  styleUrls: ['./recipt.component.css']
})
export class ReciptComponent implements OnInit {


  constructor(
    public ss: ServiceService,
    public us: UserService
  ) { }

  date: any
  displayedColumns: string[] = ['Name', 'Price', 'Quantity', 'Total product'];
  dataSource: any

  ngOnInit(): void {
    if (this.us.cart !== undefined) {
      this.dataSource = this.ss.productInCart
      this.date = moment(Date.now()).format('DD/MM/YYYY')
    } else {
      return
    }
  }

}

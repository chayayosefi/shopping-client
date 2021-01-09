import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InformationeService } from './services/informatione.service';
import { ServiceService } from './services/service.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    public ss: ServiceService,
    public us: UserService,
    public is: InformationeService,
    private r: Router
  ) { }

  title = 'client';
  value = '';
  msg: any

  ngOnInit(): void {
    if (localStorage.token != undefined) {
      const token = localStorage.token
      const date = localStorage.date
      const user = JSON.parse(localStorage.user)
      if (((Date.now() - date) / 1000) / 60 <= 10) {
        this.us.loggedUser = user
        if (this.us.loggedUser[0].role === "admin") {
          this.us.admin = true
        } else {
          this.us.checkCart()
          this.ss.getAllProductsByCart()
        }
      } else {
        this.us.logout()
      }
    }
  }


  searchProduct() {
    this.is.tempPriceByProduct(this.value).subscribe(
      (res: any) => {
        if (res.length != 0) {
          this.is.products = res
          this.value = ''
        } else {
          this.msg = 'The product is not exist in store'
        }
      }
    )
  }

  delete(){
    this.msg = ''

  }

}

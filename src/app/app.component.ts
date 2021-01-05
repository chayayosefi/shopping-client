import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InformationeService } from './services/informatione.service';
import { ServiceService } from './services/service.service';
import { UserService } from './services/user.service';
// import * as moment from 'moment'

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

  ngOnInit(): void {
    if (localStorage.token != undefined) {
      const token = localStorage.token
      const date = localStorage.date
      const user = JSON.parse(localStorage.user)
      // console.log((Date.now()-date),((Date.now()-date)/1000)/60)
      if (((Date.now() - date) / 1000) / 60 <= 10) {
        this.us.loggedUser = user
        if (this.us.loggedUser[0].role === "admin") {
          this.us.admin = true
        }else{
          this.us.checkCart()
          this.ss.getAllProductsByCart()
        }
        // this.r.navigateByUrl('/login')
      } else {
        this.us.logout()
      }
    }
  }


  searchProduct() {
    this.is.getsearchProduct(this.value).subscribe(
      (res: any) => {
        if (res.length != 0) {
          this.is.products = res
        }
      }
    )
  }


}

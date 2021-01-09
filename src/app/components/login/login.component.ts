import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    public ss: ServiceService,
    private r: Router,
    public us: UserService
  ) { }

  myForm: FormGroup
  totalProductsAvailable: any
  totalOrdersPlaced: any
  body: any

  ngOnInit(): void {
    if (this.us.loggedUser !== undefined) {
      this.us.checkCart()
      // 600000
      setTimeout(() => {
        this.us.logout()
      }, 600000);
    }

    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.ss.getAllNumProducts().subscribe(
      res => {
        this.totalProductsAvailable = res
      }
    )
    this.ss.getAllOrders().subscribe(
      res => {
        this.totalOrdersPlaced = res
      }
    )
  }

  handleSubmit() {
    this.ss.login(this.myForm.value).subscribe(
      (res: any) => {
        if (!res.error) {
          localStorage.token = res.access_token
          localStorage.date = Date.now()
          localStorage.user = JSON.stringify(res.answer)
          this.us.loggedUser = res.answer
          if (this.us.loggedUser[0].role === "admin") {
            this.us.admin = true
            this.us.login = true
            setTimeout(() => {
              this.us.logout()
            }, 600000)

            this.r.navigateByUrl('/store')

          }
          this.us.checkCart()
          // 600000
          setTimeout(() => {
            this.us.logout()
          }, 600000)
        } else {
          console.log(res.msg)
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  startS() {
    this.r.navigateByUrl('/store')
  }





}

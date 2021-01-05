
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(

    private r: Router,
    public us: UserService,
    public ss: ServiceService,
    private _formBuilder: FormBuilder
  ) { }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  patternEMAIL: any = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
  patternID: any = /^[0-9]{9}$/
  msg: any
  res: any = false
  res2: any = false

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      user_id: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      f_name: ['', Validators.required],
      l_name: ['', Validators.required]
    });
  }
  
  checkregister() {
    if (this.firstFormGroup.value.user_id.match(this.patternID)) {
      if (this.firstFormGroup.value.password === this.firstFormGroup.value.passwordConfirm) {
        if (this.firstFormGroup.value.email.match(this.patternEMAIL)) {
          this.ss.register(this.firstFormGroup.value).subscribe(
            (res: any) => {
              console.log(res.error)
              if (!res.error) {
                this.res = true
              } else {
                this.msg = res.msg
              }
            }
          )
        } else {
          this.msg = "Incorrect email"
        }
      } else {
        this.msg = "Incorrect password verification"
      }
    } else {
      this.msg = "Incorrect id"
    }
  }

  handleSubmit() {
    this.ss.registerB(Object.assign(this.firstFormGroup.value, this.secondFormGroup.value)).subscribe(
      (res: any) => {
        console.log(res)
        localStorage.token = res.access_token
        localStorage.date = Date.now()
        localStorage.user = JSON.stringify(res.answer)
        this.us.loggedUser = res.answer
        this.r.navigateByUrl('/login')
      }
    )
  }

}
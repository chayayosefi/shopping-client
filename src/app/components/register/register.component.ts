
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

  async checkNextStep(stepper) {

    if (!this.firstFormGroup.value.user_id.match(this.patternID)) {
      this.msg = "Incorrect id"
      return;
    }

    if (this.firstFormGroup.value.password !== this.firstFormGroup.value.passwordConfirm) {
      this.msg = "Incorrect password verification";
      return;
    }

    if (!this.firstFormGroup.value.email.match(this.patternEMAIL)) {
      this.msg = "Incorrect email";
      return;
    }

    const res: any = await this.ss.register(this.firstFormGroup.value).toPromise();

    if (res.error) {
      this.msg = res.msg
      return
    }
    stepper.next()

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
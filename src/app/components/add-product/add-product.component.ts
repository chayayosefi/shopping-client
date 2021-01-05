import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { InformationeService } from 'src/app/services/informatione.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(
    private r: Router,
    public is: InformationeService,
    public us: UserService,
    public ss: ServiceService,
    public as: AdminService,
    private _formBuilder: FormBuilder
  ) { }

  formGroupProduct: FormGroup;
  msg: any

  ngOnInit(): void {
    this.formGroupProduct = this._formBuilder.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      imagePath: ['', Validators.required]
    });
  }

  addProduc() {
    this.as.addProduct(this.formGroupProduct.value).subscribe(
      (res: any) => {
        if (res.error) {
          this.msg = res.msg
        } else {
          this.is.getProductsByCategory("5fbe6a13dd49bd44a8993e53").subscribe(
            res => {
              this.is.products = res
            }
          )
        }
      }
    )
  }

}

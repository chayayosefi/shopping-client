import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { InformationeService } from 'src/app/services/informatione.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

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
      name: [this.as.editProduct.name, Validators.required],
      categoryId: [this.as.editProduct.categoryId, Validators.required],
      price: [this.as.editProduct.price, Validators.required],
      imagePath: [this.as.editProduct.imagePath, Validators.required]
    });
  }

  editProduct() {
    this.as.edit_product(this.formGroupProduct.value).subscribe(
      (res: any) => {
        if (res.error) {
          this.msg = res.msg
        } else {
          this.is.getProductsByCategory("5ff9da2552c72c77fce082a0").subscribe(
            res => {
              this.is.products = res
              this.as.editProduct = undefined
              this.as.sideNav=false
            }
          )
        }
      }
    )
  }
}

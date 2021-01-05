import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(
    public ss: ServiceService,
    public us: UserService,
    private r: Router,
    public as: AdminService
  ) { }


  ngOnInit(): void {
    if (this.us.loggedUser === undefined) {
      alert("The user is not logged in")
      this.r.navigateByUrl('/login')
    }

  }

  again(){
    if(this.us.admin){
      this.as.editProduct = undefined
    }

  }


}

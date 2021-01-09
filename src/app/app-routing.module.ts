import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { ReciptComponent } from './components/recipt/recipt.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'store', component: StoreComponent },
  { path: 'order', component: OrderComponent },
  { path: 'recipt', component: ReciptComponent },
  { path: '', pathMatch: "full", redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

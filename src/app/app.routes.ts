import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  {
    path:'home',
    title: "Home",
    component:HomeComponent
  },
  {
    path: 'cart',
    title: 'My Cart',
    component: CartComponent
  },
  {path:'',redirectTo:'/home',pathMatch:"full"}
];

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ClientInformationComponent } from './pages/client-information/client-information.component';

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
  {
    path: 'client-information',
    title: 'Client Information',
    component: ClientInformationComponent
  },
  {path:'',redirectTo:'/home',pathMatch:"full"}
];

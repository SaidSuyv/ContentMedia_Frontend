import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LoadingComponent } from '../../common/loading/loading.component';
import { ErrorComponent } from '../../common/error/error.component';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { Book } from '../../models/book';
import { CartBookComponent } from './components/cart-book/cart-book.component';

@Component({
  selector: 'app-cart',
  imports: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    ErrorComponent,
    RouterModule,
    CartBookComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  books:Book[] = [];
  subtotal:string = "0.00";
  total:string = "0.00";

  isLoading:boolean = false;
  isError:boolean = false;
  errorMessage:string = "";

  constructor(
    private cartService: CartService
  ){}

  ngOnInit()
  {
    this.cartService.cart$.subscribe(
      (cart) => {
        this.subtotal = cart.map( e => parseFloat(e.book_price) ).reduce((a,b)=>a+b).toFixed(2)
        this.total = this.subtotal
        this.books = cart
      }
    )
  }

}

import { Component, effect } from '@angular/core';
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
  ){
    effect(() => {
      console.log("updatesito")
      var cart = this.cartService.cart()
      this.books = cart
      if( cart.length > 0 )
      {
        this.subtotal = this.books.map( e => e.book_price ).reduce((a,b)=>a+b).toFixed(2)
        this.total = this.subtotal
      }else
      {
        this.subtotal = "0.00"
        this.total = "0.00"
      }
    })
  }

  onQuantityChange()
  {
    this.subtotal = this.books.map( e => e.book_price * e.quantity ).reduce((a,b)=>a+b).toFixed(2)
    this.total = this.subtotal
    this.cartService.cart.update(() => this.books)
  }

  onDeleteItem(idx:number)
  {
    this.cartService.removeProduct(idx);
  }

}

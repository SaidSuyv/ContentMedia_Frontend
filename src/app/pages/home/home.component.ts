import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BookService } from '../../services/book/book.service';
import { Book } from '../../models/book';
import { LoadingComponent } from '../../common/loading/loading.component';
import { HomeBookComponent } from './components/home-book/home-book.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpError } from '../../models/http-error';
import { ErrorComponent } from '../../common/error/error.component';
import { CartService } from '../../services/cart/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'home-page',
  imports: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    ErrorComponent,
    HomeBookComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  books:Book[] = [];
  isLoading:boolean = false;
  isError:boolean = false;
  errorMessage:string = "";

  countCart:number = 0;

  constructor(
    private bookService: BookService,
    private cartService: CartService
  ){}

  ngOnInit():void
  {
    this.bookService.books$.subscribe( ( books:Book[] ) => {
      this.books = books;

      this.cartService.cart$.subscribe( (cart) => {
        this.countCart = cart.length

        if( books.length > 0 )
        {
          cart.forEach( e => {
            var book = books.findIndex( b => b.id == e.id )
            this.books[book].in_cart = true
          })
        }
      } )

    } )
    this.bookService.isLoading$.subscribe( (l:boolean) => {
      this.isLoading = l;
    })
    this.bookService.error$.subscribe( (o:HttpError) => {
      this.isError = o.error
      this.errorMessage = o.message
    } )


    this.bookService.updateBooks();
  }

  ngOnDestroy()
  {
    this.books = [];
    this.isLoading = false;
    this.isError = false;
    this.errorMessage = "";
  }

  onCartProduct(idx:number)
  {
    console.log( "cart product received" )
    this.cartService.addProduct( this.books[idx] )
  }

  onCartProductRemove(idx:number)
  {
    console.log( "index to remove" , idx )
    this.cartService.removeProduct( idx )
  }

}

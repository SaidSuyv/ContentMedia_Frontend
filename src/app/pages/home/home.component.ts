import { Component, effect, signal } from '@angular/core';
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

  isSearching = signal( false )
  inputSearch = signal("")
  querySearch = signal("")

  constructor(
    private bookService: BookService,
    private cartService: CartService
  ){
    effect(() => {
      this.books = this.bookService.books()
      this.isLoading = this.bookService.isLoading()
      this.isError = this.bookService.isError()
    })

    effect(()=>{
      this.countCart = this.cartService.cart().length

      if( this.bookService.books().length > 0 )
      {
        this.cartService.cart().forEach( e => {
          var b = this.books.findIndex( b => b.id == e.id )
          if( b >= 0 )
            this.books[b].in_cart = true
        })
      }
    })

    effect((onCleanup) => {
      const query = this.inputSearch()
      if( query.trim().length > 0 )
      {
        var timer = setTimeout(() => {
            this.bookService.searchBook( query )
        },200)
        onCleanup(() => clearTimeout( timer ))
      }
      else
        this.bookService.updateBooks()
    })
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


  onProductSearch(event:any)
  {
    this.inputSearch.set( event.target.value )
  }

}

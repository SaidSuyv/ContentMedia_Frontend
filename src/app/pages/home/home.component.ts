import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BookService } from '../../services/book/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'home-page',
  imports: [
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  books:Book[] = [];
  isLoading:boolean = false;

  constructor(private bookService: BookService){}

  ngOnInit():void
  {
    this.bookService.books$.subscribe( ( books:Book[] ) => {
      // this.books = books;
      console.log( books )
    } )
    this.bookService.isLoading$.subscribe( (l:boolean) => {
      this.isLoading = l;
    })

    this.bookService.updateBooks();
  }

  ngOnDestroy()
  {
    this.books = [];
    this.isLoading = false;
  }

}

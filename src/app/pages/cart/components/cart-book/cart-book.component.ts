import { Component, input } from '@angular/core';
import { Book } from '../../../../models/book';

@Component({
  selector: 'cart-book-component',
  imports: [],
  templateUrl: './cart-book.component.html',
  styleUrl: './cart-book.component.css'
})
export class CartBookComponent {

  bookInput = input.required<Book>()

}

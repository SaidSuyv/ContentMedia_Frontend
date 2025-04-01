import { Component, input, output } from '@angular/core';
import { Book } from '../../../../models/book';

@Component({
  selector: 'home-book-component',
  imports: [],
  templateUrl: './home-book.component.html',
  styleUrl: './home-book.component.css'
})
export class HomeBookComponent {

  bookInput = input.required<Book>()
  onAddToCart = output()
  onRemoveFromCart = output()

  addToCart()
  {
    this.bookInput().in_cart = true;
    this.onAddToCart.emit()
  }

  removeFromCart()
  {
    this.bookInput().in_cart = false;
    this.onRemoveFromCart.emit()
  }

}


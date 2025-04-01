import { Component, effect, input, output } from '@angular/core';
import { Book } from '../../../../models/book';

@Component({
  selector: 'cart-book-component',
  imports: [],
  templateUrl: './cart-book.component.html',
  styleUrl: './cart-book.component.css'
})
export class CartBookComponent {

  bookInput = input.required<Book>()
  onQuantityChange = output()
  onDelete = output()

  onIncrement()
  {
    this.bookInput().quantity += 1
    this.onQuantityChange.emit()
  }

  onDecrease()
  {
    this.bookInput().quantity -= 1;
    this.onQuantityChange.emit()
  }

  onDeleteItem()
  {
    this.onDelete.emit()
  }

}

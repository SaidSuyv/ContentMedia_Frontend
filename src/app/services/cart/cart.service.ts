import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    this.updateCart()
    this.cartSubject.subscribe( (data:Book[]) => {
      localStorage.setItem("contentmedia-cart",JSON.stringify(data));
    } )
  }

  updateCart()
  {
    const stored = localStorage.getItem("contentmedia-cart");
    console.log( "check-cart",stored );
    if( stored )
    {
      var cart = JSON.parse( stored ) as Book[];
      this.cartSubject.next( cart );
    }
  }

  addProduct(product:Book)
  {
    const cart:Book[] = this.cartSubject.getValue();
    this.cartSubject.next( [...cart,product] );
  }

  removeProduct(idx:number)
  {
    var cart:Book[] = this.cartSubject.getValue();
    var ind = cart.findIndex( e => e.id === idx )
    cart.splice( ind , 1 )
    this.cartSubject.next( cart );
  }

}

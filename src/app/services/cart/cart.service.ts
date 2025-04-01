import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart:WritableSignal<Book[]> = signal([])

  constructor() {
    effect(() => {
      console.log( "update" , this.cart() )
      localStorage.setItem("contentmedia-cart",JSON.stringify( this.cart() ))
    })
    this.updateCart()
  }

  updateCart()
  {
    const stored = localStorage.getItem("contentmedia-cart");
    console.log( "check-cart",stored );
    if( stored )
    {
      var cart = JSON.parse( stored ) as Book[];
      this.cart.set( cart )
    }
  }

  addProduct(product:Book)
  {
    product.quantity = 1;
    this.cart.update( a => [...a,product] )
  }

  removeProduct(idx:number)
  {
    this.cart.update( a => {
      var nc = a.filter( e => e.id !== idx )
      return nc
    } )
  }

}

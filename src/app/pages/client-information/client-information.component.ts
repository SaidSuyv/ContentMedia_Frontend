import { Component, effect, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule , FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';
import { BackendService } from '../../services/backend/backend.service';

@Component({
  selector: 'app-client-information',
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './client-information.component.html',
  styleUrl: './client-information.component.css'
})
export class ClientInformationComponent {

  private fb = inject(FormBuilder)
  private cart = inject(CartService)
  private backend = inject(BackendService)
  private route = inject(Router)

  client = this.fb.group({
    first_name: ['',Validators.required],
    last_name: ['',Validators.required],
    doc_type: ['1',Validators.required],
    doc_number: ['',Validators.required],
    phone: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]]
  })

  order_doc_type = this.fb.control('1',[Validators.required])

  constructor()
  {
    effect(() => {
      if( this.cart.cart().length == 0 )
        this.route.navigate(['/'])
    })
  }

  onSubmit(event:any)
  {
    if( this.client.invalid ) return
    event.target.classList.add("was-validated")

    const client = this.client.value
    const order = {
      total: this.cart.cart().map( e => e.book_price * e.quantity ).reduce((a,b) => a + b),
      doc_type: this.order_doc_type.value
    }
    const products = this.cart.cart().map( e => ({ book_id: e.id , detail_price: e.book_price , quantity: e.quantity }) )

    const body = { client , order , products }

    this.backend.post("/sale/generate",body)
    .subscribe({
      next: (response:any) => {
        if( response.data )
        {
          this.cart.reset();
          this.route.navigate(['/success'])
        }
      },
      error: (error:any) => {
        console.log("ERROR",error)
      },
      complete: () => {}
    })

  }

}

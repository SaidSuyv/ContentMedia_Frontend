import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-success',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {

}

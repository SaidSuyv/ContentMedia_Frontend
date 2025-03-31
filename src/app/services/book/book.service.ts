import { Injectable, RESPONSE_INIT } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public books$ = this.booksSubject.asObservable();
  public isLoading$ = this.loadingSubject.asObservable();

  constructor(private backend: BackendService) { }

  private isBookResponse( response:any ): response is { data: Book[] }
  {
    return Array.isArray( response.data );
  }

  updateBooks():void
  {
    this.loadingSubject.next( true );
    this.backend.get("/books")
    .subscribe({
      next: (response) => {
        if( this.isBookResponse(response) )
          this.booksSubject.next( response.data );
        else
          throw new Error("Hubo un error inesperado en la respuesta del servidor.");
      },
      error: () => {},
      complete: () => {
        this.loadingSubject.next( false );
      }
    })
  }

}

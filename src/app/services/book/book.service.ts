import { Injectable, RESPONSE_INIT, signal, WritableSignal } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../../models/book';
import { HttpError } from '../../models/http-error';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private errorSubject: BehaviorSubject<HttpError> = new BehaviorSubject<HttpError>({error:false,message:""});

  public books$ = this.booksSubject.asObservable();
  public isLoading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  public books:WritableSignal<Book[]> = signal([])
  public isLoading = signal(false)
  public isError = signal(false)
  public errorMessage = signal("")

  constructor(private backend: BackendService) { }

  updateBooks():void
  {
    this.isError.set( false )
    this.isLoading.set( true )
    this.backend.get("/books")
    .subscribe({
      next: (response:any) => {
        if( Array.isArray( response.data ) )
          this.books.set( response.data )
        else
          throw new Error("Hubo un error inesperado con el servidor.");
      },
      error: (error:any) => {
        console.log("ended error")
        this.isLoading.set( false )
        this.isError.set( true )
        this.errorMessage.set( error.message )
      },
      complete: () => {
        console.log("ended complete");
        this.isLoading.set( false )
      }
    })
  }

  searchBook(query:string)
  {
    this.isError.set( false )
    this.isLoading.set( true )
    this.backend.get("/books/"+query)
    .subscribe({
      next: (response:any) => {
        console.log( "get search" )
        if( Array.isArray( response.data ) )
          this.books.set( response.data )
        else
          this.books.set( [ response.data ] )
      },
      error: (error:any) => {
        this.isLoading.set( false )
        this.isError.set( true )
        this.errorMessage.set( error.message )
      },
      complete: () => {
        this.isLoading.set( false )
      }
    })
  }

}

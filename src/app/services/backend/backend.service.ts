import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  url:string = "http://localhost:8000/api";

  constructor(
    private http: HttpClient
  ) { }

  get(path:string)
  {
    return this.http.get( this.url + path );
  }

  post(path:string,body:object)
  {
    return this.http.post( this.url + path , body );
  }
}

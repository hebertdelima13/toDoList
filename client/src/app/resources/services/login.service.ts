import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestLogin } from '../models/RequestLogin';
import { RequestRegister } from '../models/RequestRegister';
import { ResponseLogin } from '../models/ResponseLogin';

const AUTH_API = 'http://localhost:3000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public doLogin(requestLogin: RequestLogin): Observable<ResponseLogin>{
    return this.httpClient.post<ResponseLogin>(AUTH_API + 'login', requestLogin, httpOptions)
  }

  public doRegister(requestRegister: RequestRegister): Observable<any> {
    return this.httpClient.post<any>(AUTH_API + 'register', requestRegister, httpOptions);
  }
}

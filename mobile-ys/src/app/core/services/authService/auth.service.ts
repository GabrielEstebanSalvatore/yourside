import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = 'http://localhost:4000/auth';

  constructor(private http: HttpClient) { }
  
  getValidation = (client: any) =>{
    return this.http.post(`${this.API_URI}`, client);
  }

  loggedIn = () : boolean =>{
    return !!localStorage.getItem("token");
  }
}

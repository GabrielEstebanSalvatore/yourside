import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = environment.HOST_API + 'auth';

  constructor(private http: HttpClient) { }
  
  getValidation = (client: any) =>{
    return this.http.post(`${this.API_URI}`, client);
  }

  authClient = () =>{
    return this.http.get(`${this.API_URI}`);
  }

  loggedIn = () : boolean =>{
    return !!localStorage.getItem("token");
  }
}

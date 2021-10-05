import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from 'src/app/shared/models/clientModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  API_URI = environment.HOST_API + 'clientes';
  
  constructor(private http: HttpClient) { }
  
  insert = (client: Cliente) => {
    return this.http.post(`${this.API_URI}`, client);
  }

  edit = (id: string, editClient : Cliente) =>{
    return this.http.put(`${this.API_URI}/${id}`, editClient);
  }

  delete = (id: string)=>{
    return this.http.delete(`${this.API_URI}/${id}`);
  }

  getOne = (id: string) => {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  getAll = () => {
    return this.http.get(`${this.API_URI}`);
  }
}

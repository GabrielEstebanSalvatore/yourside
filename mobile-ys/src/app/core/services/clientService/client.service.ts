import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Cliente } from 'src/app/core/models/clientModel';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  API_URI = 'http://localhost:4000/clientes';

  constructor(private http: HttpClient) { }
  
  insert = (cliente: Cliente) => {
    return this.http.post(`${this.API_URI}`, cliente);
  }

  edit = (id: string, modCliente : Cliente) =>{
    return this.http.put(`${this.API_URI}/${id}`, modCliente);
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

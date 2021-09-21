import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Article } from '../../models/articleModel';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  API_URI = 'http://localhost:4000/articulos';

  constructor(private http: HttpClient) { }
  
  insert = (cliente: Article) =>{
    return this.http.post(`${this.API_URI}`, cliente);
  }

  edit = (id: string, modCliente : Article) =>{
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

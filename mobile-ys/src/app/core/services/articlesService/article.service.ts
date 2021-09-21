import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Article } from '../../models/articleModel';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  API_URI = 'http://localhost:4000/articles';

  constructor(private http: HttpClient) { }
  
  insert = (article: Article) =>{
    return this.http.post(`${this.API_URI}`, article);
  }

  edit = (id: string, editArticle : Article) =>{
    return this.http.put(`${this.API_URI}/${id}`, editArticle);
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

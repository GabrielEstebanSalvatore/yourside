import { Component, OnInit } from '@angular/core'
import { MenuController } from '@ionic/angular'
import { Article } from 'src/app/core/models/articleModel';
import { ArticleService } from 'src/app/core/services/articlesService/article.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
    articles: Article[];
    image_Path: string;

    constructor(private menu: MenuController, private articleService: ArticleService) { 
        this.articles = [];
        this.image_Path= "http://localhost:4000";
    }

    togglemenu = () =>{
        this.menu.toggle();
    }

    ngOnInit(){
        this.articleService.getAll().subscribe(
            res =>{
                this.articles = Object.values(res)[1];
                console.log(this.articles);
            },
            error=> console.log(error)
        )
    }
}

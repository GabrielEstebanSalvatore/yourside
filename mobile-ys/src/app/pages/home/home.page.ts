import { Component, OnInit } from '@angular/core'
import { MenuController } from '@ionic/angular'
import { Article } from 'src/app/shared/models/articleModel';
import { ArticleService } from 'src/app/shared/services/articlesService/article.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
    articles: Article[];
    image_Path : string;

    constructor(private menu: MenuController, private articleService: ArticleService) { 

        this.image_Path = environment.HOST_API;
    }

    togglemenu = () =>{
        this.menu.toggle();
    }

    ngOnInit(){
        this.articleService.getAll().subscribe(
            res =>{
                this.articles = Object.values(res)[1];
            },
            error=> console.log(error)
        )
    }
}

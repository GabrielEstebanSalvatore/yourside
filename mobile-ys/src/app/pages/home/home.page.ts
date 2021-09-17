import { Component, OnInit } from '@angular/core'
import { MenuController } from '@ionic/angular'
import { ArticleService } from 'src/app/core/services/articlesService/article.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
    articles: any;

    constructor(private menu: MenuController, private articleService: ArticleService) { 
        this.articles = [];
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

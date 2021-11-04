import { Component, OnDestroy, OnInit } from '@angular/core'
import { MenuController } from '@ionic/angular'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { ArticleApi } from 'src/app/shared/api/article.api'
import { OfferApi } from 'src/app/shared/api/offer.api'
import { ArticleModel } from 'src/app/shared/models/article.model'
import { OfferModel } from 'src/app/shared/models/offer.model'
import { environment } from 'src/environments/environment'
import * as Auth from 'src/app/core/state/app.action'
import { AuthService } from 'src/app/core/services/auth.service'
import { AppState } from '@capacitor/app'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
    private subscriptions = new Subscription()
    articles: ArticleModel[]
    articlesWithOffer: ArticleModel[]
    offers: OfferModel[]

    image_Path: string

    slideOpts = {
        initialSlide: 0,
        speed: 400
    }

    constructor(private menu: MenuController, private articleApi: ArticleApi, private offerApi: OfferApi, private authService: AuthService, private store: Store<AppState>) {
        this.image_Path = environment.HOST_API
    }
    ngOnDestroy(): void {
       // this.subscriptions.unsubscribe()
    }

    togglemenu = () => {
        this.menu.toggle()
    }

    ngOnInit() {
        if(localStorage.getItem("token")) this.getClient()
        this.getArticles()
        this.getOffers()
    }

    getArticles(): void {
        this.subscriptions.add(
            this.articleApi.all().subscribe({
                error: (error: any) => {
                    console.error(error)
                },
                next: (articles) => {
                    this.articles = articles
                    this.articlesWithOffer = this.articles.filter((article) => article.offer != null);
                },
            })
        )
    }

    getOffers(): void {
        console.table(this.articlesWithOffer)
    }

    getClient():void{
        this.store.dispatch(new Auth.GetAuthenticatedClient())
    }
}

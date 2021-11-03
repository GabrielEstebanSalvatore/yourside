import { Component, OnDestroy, OnInit } from '@angular/core'
import { MenuController } from '@ionic/angular'
import { Subscription } from 'rxjs'
import { ArticleApi } from 'src/app/shared/api/article.api'
import { OfferApi } from 'src/app/shared/api/offer.api'
import { ArticleModel } from 'src/app/shared/models/article.model'
import { OfferModel } from 'src/app/shared/models/offer.model'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
    private subscriptions = new Subscription()
    articles: ArticleModel[]
    offers: OfferModel[]
    image_Path: string

    slideOpts = {
        initialSlide: 0,
        speed: 400
    }

    constructor(private menu: MenuController, private articleApi: ArticleApi, private offerApi: OfferApi) {
        this.image_Path = environment.HOST_API
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    togglemenu = () => {
        this.menu.toggle()
    }

    ngOnInit() {
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
                },
            })
        )
    }

    getOffers(): void {
        this.subscriptions.add(
            this.offerApi.all().subscribe({
                error: (error: any) => {
                    console.error(error)
                },
                next: (offers) => {
                    this.offers = offers
                },
            })
        )
    }
}

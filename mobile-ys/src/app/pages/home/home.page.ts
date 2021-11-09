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
import { ToastController } from '@ionic/angular'
import { TrolleyModel } from 'src/app/shared/models/trolley.model'

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
    trolley: TrolleyModel = {
        id: null,
        client: null,
        available: true,
        date: Date.now().toString(),
        total: 0,
        articles: [],
    }

    image_Path: string

    slideOpts = {
        initialSlide: 0,
        speed: 400,
    }

    constructor(
        private menu: MenuController,
        private articleApi: ArticleApi,
        private offerApi: OfferApi,
        private authService: AuthService,
        private store: Store<AppState>,
        private toastController: ToastController
    ) {
        this.image_Path = environment.HOST_API
    }
    ngOnDestroy(): void {
        // this.subscriptions.unsubscribe()
    }

    togglemenu = () => {
        this.menu.toggle()
    }

    ngOnInit() {
        if (localStorage.getItem('token')) this.getClient()
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
                    this.articlesWithOffer = this.articles.filter(
                        (article) => article.offer !== null
                    )
                },
            })
        )
    }

    getOffers(): void {
        // console.log(this.articlesWithOffer)
    }

    getClient(): void {
        this.store.dispatch(new Auth.GetAuthenticatedClient())
    }

    async openToast(articleName: string = 'Article') {
        const toast = await this.toastController.create({
            message: `${articleName} added to cart`,
            duration: 1000,
            position: 'bottom',
        })
        toast.present()
    }

    trolleyAddItem(article: ArticleModel, price: number): void {
        this.trolley.articles.push(article)
        this.trolley.total += price

        console.log(this.trolley)
    }

    trolleyRemoveItem(article: ArticleModel, price: number): void {
        this.trolley.articles = this.trolley.articles.filter(
            (item) => item.id !== article.id
        )
        this.trolley.total -= price

        console.log(this.trolley)
    }

    openTrolley() {
        console.log('send')
    }
}

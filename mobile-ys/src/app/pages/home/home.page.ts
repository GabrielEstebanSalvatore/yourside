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
import { Router } from '@angular/router'

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
        date: null,
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
         private toastController: ToastController,
         private router: Router
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
        // if (localStorage.getItem("token")) this.getClient();
        (localStorage.getItem('trolley') === null || undefined) ? this.setLocalStore() : this.getLocalStore();
        this.getArticles();
        this.getOffers();
    }

    getArticles(): void {
        this.subscriptions.add(
            this.articleApi.all().subscribe({
                error: (error: any) => {
                    console.error(error)
                },
                next: (articles) => {
                    this.articles = articles;
                    this.articlesWithOffer = articles.filter(
                      (article) => article.offer !== null);
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

    async showToast(message: string, duration: number = 1000) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            position: 'bottom'
        });
        toast.present();
    }

    async trolleyAddItem(article: ArticleModel): Promise<void> {
        if (localStorage.getItem('trolley') === null || undefined) this.trolley.articles = [];
        console.log(article)
        if (this.authService.loggedIn()) {
            this.showToast(`${article.name} added to cart`);
            this.trolley.articles.push(article);
            await this.trolleyUdatePrice()
        } else {
            this.showToast('Tienes que estar logueado', 1500);
            this.router.navigate(['/login']);
        }
        this.setLocalStore()
    }

    async trolleyRemoveItem(index: number): Promise<void> {
        this.trolley.articles.slice(index,1)
        await this.trolleyUdatePrice()
        this.setLocalStore()
    }
  
    async trolleyUdatePrice(): Promise<void> {
        this.trolley.total = 0;
        this.trolley.articles.forEach(e => { (e.offer === null) ? this.trolley.total += e.sellPrice : this.trolley.total += e.sellPriceOffer })
        console.log(this.trolley)
    }

    setLocalStore(){
        let {articles, total} = this.trolley;
        localStorage.setItem('trolley', JSON.stringify({
            articles,
            total
        }));
    }

    getLocalStore(){
        let { articles, total } = JSON.parse(localStorage.getItem('trolley'));
        this.trolley.articles = articles;
        this.trolley.total = total;
    }
}

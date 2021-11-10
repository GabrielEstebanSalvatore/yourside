import { Component, OnDestroy, OnInit } from '@angular/core'
import { MenuController } from '@ionic/angular'
import { Subscription } from 'rxjs'
import { ArticleApi } from 'src/app/shared/api/article.api'
import { ArticleModel } from 'src/app/shared/models/article.model'
import { OfferModel } from 'src/app/shared/models/offer.model'
import { environment } from 'src/environments/environment'
import { AuthService } from 'src/app/core/services/auth.service'
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
        private authService: AuthService,
        private toastController: ToastController,
        private router: Router
    ) {
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
    }

    getArticles(): void {
        this.subscriptions.add(
            this.articleApi.all().subscribe({
                error: (error: any) => {
                    console.error(error)
                },
                next: (articles) => {
                    this.articles = articles
                    this.articlesWithOffer = articles.filter(
                        (article) => article.offer !== null
                    )
                },
            })
        )
    }

    async showToast(message: string, duration: number = 1000) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            position: 'bottom',
        })
        toast.present()
    }

    async trolleyAddItem(article: ArticleModel): Promise<void> {
        if (this.authService.loggedIn()) {
            this.addNewArticle(article)
            this.showToast(`${article.name} agregado al carrito`)
        } else {
            this.showToast('Tienes que estar logueado', 1500)
            this.router.navigate(['/login'])
        }
    }
    addNewArticle(article): void {
        const listAarticles = localStorage.getItem('trolley')
        if (listAarticles === null || undefined) {
            const articles = [article]

            localStorage.setItem(
                'trolley',
                JSON.stringify({
                    articles,
                })
            )
        } else {
            const newArticle = JSON.parse(listAarticles)
            const oldArticles = newArticle.articles
            const articles = [...oldArticles, article]
            localStorage.setItem(
                'trolley',
                JSON.stringify({
                    articles,
                })
            )
        }
    }
}

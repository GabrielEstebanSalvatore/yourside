import {
    Component,
    ComponentFactoryResolver,
    OnDestroy,
    OnInit,
} from '@angular/core'
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular'
import { environment } from 'src/environments/environment'
import { Subscription } from 'rxjs'
import { ArticleApi } from 'src/app/shared/api/article.api'
import { InitService } from 'src/app/core/services/init.service'
import { StateService } from 'src/app/core/services/state.service'

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy {
    private subscriptions = new Subscription()
    client: any
    image_Path: string
    slideOpts = {
        initialSlide: 0,
        speed: 400,
    }
    articles: any
    totalCart: number
    constructor(
        private toastController: ToastController,
        private router: Router,
        private articleApi: ArticleApi,
        private initService: InitService,
        private stateProvider: StateService
    ) {
        this.image_Path = environment.HOST_API
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit() {
        this.initService.startInitModule()
        this.stateProvider.getCustomer().subscribe((x: any) => {
            const client = x.app.client
            this.client = client
        })
        this.getLocalStore()
    }

    async showToast(message: string, duration: number = 1000) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            position: 'bottom',
        })
        toast.present()
    }

    trolleyRemoveItem(index: number): void {
        this.articles.splice(index, 1)
        const articles = this.articles
        localStorage.setItem(
            'trolley',
            JSON.stringify({
                articles,
            })
        )

        if (this.articles.length === 0) {
            this.showToast('El carrito esta vacio')
            this.router.navigate(['/home'])
        } else {
            this.showToast('Articulo eliminado')
        }
    }

    getLocalStore() {
        const listAarticles = localStorage.getItem('trolley')
        if (listAarticles === null || undefined) {
            const articles = []

            localStorage.setItem(
                'trolley',
                JSON.stringify({
                    articles,
                })
            )
        } else {
            const articles = JSON.parse(localStorage.getItem('trolley'))
            if (articles.articles.length > 0) {
                this.articles = articles.articles
                this.totalCart = this.articles
                    .map((x) => x.sellPrice)
                    .reduce((prev, acum) => prev + acum)
            }
        }
    }

    sendBuy() {
        this.initService.isInitModuleFinished().subscribe((is) => {
            if (is) {
                this.makePurchase()
            }
        })
    }
    makePurchase(): void {
        const articles = JSON.parse(localStorage.getItem('trolley'))
        this.subscriptions.add(
            this.articleApi
                .makePurchase(this.client, articles.articles)
                .subscribe({
                    error: (error: any) => {
                        console.error(error)
                    },
                    next: (response) => {
                        if (response.ok) {
                            this.showToast('Compra completada', 2000)
                            localStorage.removeItem('trolley')
                            this.router.navigate(['/home'])
                        }
                    },
                })
        )
    }
}

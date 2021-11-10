import {
    Component,
    ComponentFactoryResolver,
    OnDestroy,
    OnInit,
} from '@angular/core'
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular'
import { TrolleyModel } from 'src/app/shared/models/trolley.model'
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
    trolley: TrolleyModel = {
        id: null,
        client: null,
        available: true,
        date: null,
        total: 0,
        articles: [],
    }
    slideOpts = {
        initialSlide: 0,
        speed: 400,
    }

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
        localStorage.getItem('trolley') === null || undefined
            ? this.setLocalStore()
            : this.getLocalStore()
        console.log(this.trolley)
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
        this.trolley.articles.splice(index, 1)
        this.trolleyUdatePrice()
        this.setLocalStore()

        if (this.trolley.articles.length == 0) {
            this.showToast('El carrito esta vacio')
            this.router.navigate(['/home'])
        } else {
            this.showToast('Articulo eliminado')
        }
    }

    trolleyUdatePrice(): void {
        this.trolley.total = 0
        this.trolley.articles.forEach((e) => {
            e.offer === null
                ? (this.trolley.total += e.sellPrice)
                : (this.trolley.total += e.sellPriceOffer)
        })
        //console.log(this.trolley)
    }

    setLocalStore() {
        let { articles, total } = this.trolley
        localStorage.setItem(
            'trolley',
            JSON.stringify({
                articles,
                total,
            })
        )
    }

    getLocalStore() {
        let { articles, total } = JSON.parse(localStorage.getItem('trolley'))
        this.trolley.articles = articles
        this.trolley.total = total
    }

    sendBuy() {
        console.log(this.trolley.articles)

        this.initService.isInitModuleFinished().subscribe((is) => {
            if (is) {
                this.makePurchase()
            }
        })
    }
    makePurchase(): void {
        this.subscriptions.add(
            this.articleApi
                .makePurchase(this.client, this.trolley.articles)
                .subscribe({
                    error: (error: any) => {
                        console.error(error)
                    },
                    next: (response) => {
                        if (response.ok) {
                            this.showToast('Compra completada', 2000)
                            this.trolley.total = 0
                            this.trolley.articles = []
                            /*localStorage.removeItem('trolley')*/
                            this.router.navigate(['/home'])
                        }
                    },
                })
        )
    }
}

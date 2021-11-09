import { Component, Input, OnInit, SimpleChanges } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { ArticleModel } from 'src/app/shared/models/article.model'
import { ReceiptDetailModel } from 'src/app/shared/models/receiptDetails.model'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-receipt-details',
    templateUrl: './receipt-details.page.html',
    styleUrls: ['./receipt-details.page.scss'],
})
export class ReceiptDetailsPage implements OnInit {
    @Input() receiptDetail: any
    receiptDetails: any
    articlesDetail: Array<ArticleModel> = new Array<ArticleModel>()
    image_Path: string
    totalDetalle: number = 0

    constructor(private modalController: ModalController) {
        this.image_Path = environment.HOST_API
        //this.receiptDetails = {
        //  available : true,
        //  state : 1,
        //  price : 0,
        //  amount : 0,
        //  articles : []
        //}
    }
    ngOnInit() {
        this.articlesDetail = this.receiptDetail.articles
        this.getTotalDetalle()
    }
    getTotalDetalle(): void {
        this.totalDetalle = this.articlesDetail
            .map((x) => x.sellPrice)
            .reduce((prev, curr) => prev + curr)
    }

    closeModal = () => {
        this.modalController.dismiss()
    }
}

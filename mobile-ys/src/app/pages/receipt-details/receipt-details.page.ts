import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReceiptDetailModel } from 'src/app/shared/models/receiptDetails.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.page.html',
  styleUrls: ['./receipt-details.page.scss'],
})
export class ReceiptDetailsPage implements OnInit {
  @Input() receiptDetail: ReceiptDetailModel
  receiptDetails: any
  articlesDetail : any
  image_Path : string

  constructor( private modalController: ModalController) {
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
  }

  closeModal = () =>{
    this.modalController.dismiss();
  }

}

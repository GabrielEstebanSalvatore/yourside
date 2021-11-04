import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReceiptApi } from 'src/app/shared/api/receipt.api';
import { ReceiptModel } from 'src/app/shared/models/receipt.model';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {
  private subscriptions = new Subscription();
  receipts: ReceiptModel [];
  constructor(private receiptApi: ReceiptApi) { }
  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
  ngOnInit() {
    this.getReceipts()
  }

  getReceipts = () =>{
    this.subscriptions.add(
      this.receiptApi.all().subscribe({
          error: (error: any) => {
              console.error(error)
          },
          next: (receipts) => {
              this.receipts = receipts
          },
      })
  )
  }

  getReceiptDetail = (id: number) => {

  }

}

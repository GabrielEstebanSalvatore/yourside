import { Component, OnInit } from '@angular/core';
import { AppState } from '@capacitor/app';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ReceiptApi } from 'src/app/shared/api/receipt.api';
import { UserRoleEnum } from 'src/app/shared/enums/user-role.enum';
import { ClientModel } from 'src/app/shared/models/client.model';
import { ReceiptModel } from 'src/app/shared/models/receipt.model';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {
  private subscriptions = new Subscription();
  receipts: ReceiptModel [];
  client: ClientModel;

  constructor(private receiptApi: ReceiptApi, private store: Store<AppState>) { 
    this.client = {
      _id: 0,
      name: '',
      address: '',
      email: '',
      password: '',
      cell: '',
      role: UserRoleEnum.USER_ROLE,
      state: 1,
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  ngOnInit() {
    this.getClient()
    this.getReceipts()
    console.log(this.client._id)
  }

  getReceipts = () =>{
    this.subscriptions.add(
      this.receiptApi.getReceiptsByClient(this.client._id).subscribe({
          error: (error: any) => {
              console.error(error)
          },
          next: (receipts) => {
              this.receipts = receipts
          },
      })
    )
  }

  getClient = () =>{
    this.store.subscribe((res: any) => this.client = JSON.parse(JSON.stringify(res.app.client)))
  }
  

  getReceiptDetail = (id: number) => {

  }

}

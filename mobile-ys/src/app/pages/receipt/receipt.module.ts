import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReceiptPageRoutingModule } from './receipt-routing.module';
import { ReceiptPage } from './receipt.page';
import { ReceiptApi } from 'src/app/shared/api/receipt.api';
import { ReceiptDetailsPage } from '../receipt-details/receipt-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiptPageRoutingModule
  ],
  declarations: [ReceiptPage],
  providers : [ReceiptApi],
  entryComponents:[ReceiptDetailsPage]
})
export class ReceiptPageModule {}

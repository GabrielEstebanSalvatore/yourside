import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { CartPageRoutingModule } from './cart-routing.module'

import { CartPage } from './cart.page'
import { ArticleApi } from 'src/app/shared/api/article.api'
import { StateService } from 'src/app/core/services/state.service'

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, CartPageRoutingModule],
    declarations: [CartPage],
    providers: [ArticleApi, StateService],
})
export class CartPageModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { HomePage } from './home.page'
import { HomePageRoutingModule } from './home-routing.module'
import { ArticleApi } from 'src/app/shared/api/article.api'
import { OfferApi } from 'src/app/shared/api/offer.api'

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
    declarations: [HomePage],
    providers: [ArticleApi, OfferApi],
})
export class HomePageModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { HomePage } from './home.page'
import { HomePageRoutingModule } from './home-routing.module'
import { ArticleApi } from 'src/app/shared/api/article.api'
import { EffectsModule } from '@ngrx/effects'
import { AppEffects } from 'src/app/core/state/app.effects'

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, EffectsModule.forFeature([AppEffects])],
    declarations: [HomePage],
    providers: [ArticleApi],
})
export class HomePageModule {}

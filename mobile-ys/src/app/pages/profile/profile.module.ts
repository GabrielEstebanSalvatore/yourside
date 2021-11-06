import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from 'src/app/core/state/app.effects';
import { ClientApi } from 'src/app/shared/api/client.api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    EffectsModule.forFeature([AppEffects])
  ],
  declarations: [ProfilePage],
  providers: [ClientApi],
})
export class ProfilePageModule {}

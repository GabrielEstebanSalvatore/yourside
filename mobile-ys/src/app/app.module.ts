import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { InterceptorService } from './core/interceptor/interceptor.service'
import { StoreModule } from '@ngrx/store'
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import {  StoreDevtoolsModule } from '@ngrx/store-devtools'
import { appReducer } from './core/state/app.reducer';
import { AppEffects } from './core/state/app.effects'


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        StoreModule.forRoot({ app: appReducer}),
        EffectsModule.forRoot([AppEffects]),
        StoreRouterConnectingModule.forRoot(),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

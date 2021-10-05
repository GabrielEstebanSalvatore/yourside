import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { ClientService } from './shared/services/clientService/client.service'
import { InterceptorService } from './core/interceptor/interceptor.service'


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, CommonModule, HttpClientModule],
    providers: [
        { provide: RouteReuseStrategy, 
            useClass: IonicRouteStrategy 
        }, ClientService, 
        { provide: HTTP_INTERCEPTORS, 
            useClass: InterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

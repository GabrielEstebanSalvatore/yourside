import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/core/services/auth.service'
import { Subscription } from 'rxjs'
import { AuthRequest } from 'src/app/core/requests/auth.request'
import { Store } from '@ngrx/store'
import * as Auth from 'src/app/core/state/app.action'
import { AppState } from '@capacitor/app'
import { MenuController } from '@ionic/angular'

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
    private subscriptions = new Subscription()
    client: any;
    
    constructor(private authService: AuthService, private router: Router, private store : Store<AppState>, private menu: MenuController) {
        this.client = {
            email: '',
            password: '',
        }
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit() {}
    /*
    togglemenu = () => {
        this.menu.toggle()
      }*/

    createRequest(): AuthRequest {
        return {
            email: this.client.email,
            password: this.client.password,
        }
    }
    validate = () => {
       this.store.dispatch(new Auth.Login(this.createRequest()))
    }
}

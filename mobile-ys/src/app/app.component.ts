import { Component } from '@angular/core'
import { Store } from '@ngrx/store';
import { AuthService } from './core/services/auth.service';
import { Logout } from './core/state/app.action';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    isLogged: boolean 
    constructor(private authService: AuthService, private store: Store<any>) {
        this.isLogged = this.authService.loggedIn();
    }

    logOut = () => {
        this.store.dispatch(new Logout())
    }
}

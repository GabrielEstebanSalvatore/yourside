import { Component } from '@angular/core'
import { AuthService } from './shared/services/authService/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    constructor(public authService: AuthService) {}

    logOut = () =>{
        localStorage.removeItem("token");
    }
}

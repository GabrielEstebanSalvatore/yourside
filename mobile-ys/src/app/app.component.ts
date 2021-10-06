import { Component } from '@angular/core'

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    isLogged: boolean = true
    constructor() {}

    logOut = () => {
        localStorage.removeItem('token')
    }
}

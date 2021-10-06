import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/core/services/auth.service'
import { Subscription } from 'rxjs'
import { AuthRequest } from 'src/app/core/requests/auth.request'

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
    private subscriptions = new Subscription()
    client: any
    constructor(private authService: AuthService, private router: Router) {
        this.client = {
            email: '',
            password: '',
        }
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit() {}

    createRequest(): AuthRequest {
        return {
            email: this.client.email,
            password: this.client.password,
        }
    }
    validate = () => {
        this.authService.login(this.createRequest()).subscribe({
            error: (error: any) => {
                console.error(error)
            },
            next: (response) => {
                console.log(response)
                localStorage.setItem('token', response.token)
                this.router.navigate(['/home'])
            },
        })
    }
}

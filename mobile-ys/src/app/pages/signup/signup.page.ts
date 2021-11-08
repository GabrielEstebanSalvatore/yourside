import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MenuController } from '@ionic/angular'
import { Subscription } from 'rxjs'
import { RegisterRequest } from 'src/app/core/requests/register.request'
import { AuthService } from 'src/app/core/services/auth.service'
import { UserRoleEnum } from 'src/app/shared/enums/user-role.enum'
import { ClientModel } from 'src/app/shared/models/client.model'

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit, OnDestroy {
    private subscriptions = new Subscription()
    cliente: ClientModel

    constructor(private authService: AuthService, private router: Router, private menu: MenuController) {
        this.cliente = {
            name: '',
            address: '',
            email: '',
            password: '',
            cell: '',
            role: UserRoleEnum.USER_ROLE,
            state: 1,
        }
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnInit() {}
    
    togglemenu = () => {
        this.menu.toggle()
    }

    createRequest(): RegisterRequest {
        return {
            name: this.cliente.name,
            address: this.cliente.address,
            email: this.cliente.email,
            password: this.cliente.password,
            cell: this.cliente.cell,
            role: UserRoleEnum.USER_ROLE,
            state: this.cliente.state,
        }
    }
    createClient = () => {
        this.subscriptions.add(
            this.authService.register(this.createRequest()).subscribe({
                error: (error: any) => {
                    console.error(error)
                },
                next: (response) => {
                    console.log(response)
                    this.router.navigate(['/login'])
                },
            })
        )
    }
}

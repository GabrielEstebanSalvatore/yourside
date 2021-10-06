import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { LoginPageRoutingModule } from './login-routing.module'
import { LoginPage } from './login.page'
import { AuthApi } from 'src/app/shared/api/auth.api'
import { AuthService } from 'src/app/core/services/auth.service'

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, LoginPageRoutingModule],
    declarations: [LoginPage],
    providers: [AuthApi, AuthService],
})
export class LoginPageModule {}

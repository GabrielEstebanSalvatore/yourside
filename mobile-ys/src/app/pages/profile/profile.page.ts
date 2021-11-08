import { Component, OnInit } from '@angular/core';
import { AppState } from '@capacitor/app';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserRoleEnum } from 'src/app/shared/enums/user-role.enum';
import { ClientModel } from 'src/app/shared/models/client.model';
import { ClientApi } from 'src/app/shared/api/client.api'
import { ChangeProfile } from 'src/app/core/state/app.action';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private subscriptions = new Subscription()
  cliente: ClientModel
    
  constructor(private store: Store<AppState>, private clientApi: ClientApi, private menu: MenuController) {
    this.cliente = {
      _id: 0,
      name: '',
      address: '',
      email: '',
      password: '',
      cell: '',
      role: UserRoleEnum.USER_ROLE,
      state: 1,
    }
  }

  ngOnInit() {
    this.store.subscribe((res: any) => this.cliente = JSON.parse(JSON.stringify(res.app.client)))
  }

  togglemenu = () => {
    this.menu.toggle()
  }

  editClient = () =>{
    this.store.dispatch(new ChangeProfile(this.cliente))
  }
}

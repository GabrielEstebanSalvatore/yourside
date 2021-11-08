import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor( private menu: MenuController) { }

  ngOnInit() {
  }

  togglemenu = () => {
    this.menu.toggle()
  }

}

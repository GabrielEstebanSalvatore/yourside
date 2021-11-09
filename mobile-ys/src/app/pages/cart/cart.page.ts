import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TrolleyModel } from 'src/app/shared/models/trolley.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  image_Path: string
  trolley: TrolleyModel = {
    id: null,
    client: null,
    available: true,
    date: null,
    total: 0,
    articles: []
  }
  slideOpts = {
    initialSlide: 0,
    speed: 400
  }

  constructor(private toastController: ToastController, private router: Router) {
    this.image_Path = environment.HOST_API
  }

  ngOnInit() {
    (localStorage.getItem('trolley') === null || undefined) ? this.setLocalStore() : this.getLocalStore();
    console.log(this.trolley)
  }

  async showToast(message: string, duration: number = 1000) {
    const toast = await this.toastController.create({
        message: message,
        duration: duration,
        position: 'bottom'
    });
    toast.present();
}

  trolleyRemoveItem(index: number): void {
    this.trolley.articles.splice(index, 1)
    this.trolleyUdatePrice()
    this.setLocalStore();
    
    if (this.trolley.articles.length == 0) {
      this.showToast('The cart is empty')
      this.router.navigate(['/home'])
    } else {
      this.showToast('Item removed')
    }
  }

  trolleyUdatePrice(): void {
    this.trolley.total = 0;
    this.trolley.articles.forEach(e => { (e.offer === null) ? this.trolley.total += e.sellPrice : this.trolley.total += e.sellPriceOffer })
    //console.log(this.trolley)
  }

  setLocalStore() {
    let { articles, total } = this.trolley;
    localStorage.setItem('trolley', JSON.stringify({
      articles,
      total
    }));
  }

  getLocalStore() {
    let { articles, total } = JSON.parse(localStorage.getItem('trolley'));
    this.trolley.articles = articles;
    this.trolley.total = total;
  }

  sendBuy() {
    this.showToast('Purchase completed', 2000)    
    this.trolley.total = 0
    this.trolley.articles = []
    /*localStorage.removeItem('trolley')*/
    this.router.navigate(['/home'])
  }
}

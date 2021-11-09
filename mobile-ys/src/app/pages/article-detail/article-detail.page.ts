import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
})
export class ArticleDetailPage implements OnInit {
  article: any = null;
  id: any = null;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => this.id = p.get('id'));
  }
}

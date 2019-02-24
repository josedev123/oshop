import { CategoryService } from './../../category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories$: Observable<any>;
  subscription: Subscription;

  constructor(categoryService: CategoryService) {
    this.subscription = categoryService.getCategories().subscribe(categories => this.categories$ = categories);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
      this.subscription.unsubscribe(); 
  }

}
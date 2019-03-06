import { CategoryService } from './../../category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories$: Observable<any>;
  product = {};
  productSubscription: Subscription;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    ) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {this.productSubscription = this.productService.get(this.id).valueChanges().subscribe(p => this.product = p); }
  }

  save(product) {
    if (this.id) {this.productService.update(this.id, product);
    } else {this.productService.create(product); }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you wat to delete this product?')) {return; }

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.productSubscription) {
    this.productSubscription.unsubscribe();
    }
  }
 }

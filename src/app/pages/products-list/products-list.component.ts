import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { ProductService } from '../../services/product.service';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products = signal<Product[]>([]);
  productService = inject(ProductService);
  suscriptions: Subscription[] = [];
  constructor() {
  }
  ngOnDestroy(): void {
    this.suscriptions.forEach(s => s.unsubscribe());
  }

  async ngOnInit() {
    this.suscriptions.push(this.productService.loadProducts().subscribe());
    const products = await firstValueFrom(this.productService.products$);
    console.log(products);
    this.products.set(products)
  }


}

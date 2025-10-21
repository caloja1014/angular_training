import { Component, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductCardComponent } from "../../components/product-card/product-card.component";

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  // products = signal<Product[]>([
  //   { id: 1, title: 'Product 1', image: 'https://placehold.co/150', price: 10.99, stock: 5, category: 'Category A', description: 'This is a description for Product 1' },
  //   { id: 2, title: 'Product 2', image: 'https://placehold.co/150', price: 12.99, stock: 3, description: 'This is a description for Product 2' },
  //   { id: 3, title: 'Product 3', image: 'https://placehold.co/150', price: 8.99, stock: 0, category: 'Category B', description: 'This is a description for Product 3' },
  //   { id: 4, title: 'Product 4', image: 'https://placehold.co/150', price: 15.99, stock: 10, category: 'Category A', description: 'This is a description for Product 4' },
  // ])
}

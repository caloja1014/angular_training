import { Component, input, output } from '@angular/core';
import { ProductCart } from '../../models/product-cart.model';

@Component({
  selector: 'app-product-cart',
  imports: [],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss'
})
export class ProductCartComponent {

  product = input.required<ProductCart>();

  onRemove = output<number>();

  removeFromCart() {
    this.onRemove.emit(this.product().product.id);
  }

}

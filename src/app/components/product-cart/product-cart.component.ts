import { Component, input, output } from '@angular/core';
import { CartItem, ProductCart } from '../../models/product-cart.model';

@Component({
  selector: 'app-product-cart',
  imports: [],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss'
})
export class ProductCartComponent {

  cartItem = input.required<CartItem>();

  onRemove = output<number>();


  removeFromCart() {
    this.onRemove.emit(this.cartItem().id);
  }

}

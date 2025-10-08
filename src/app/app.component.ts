import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PrimaryButtonComponent } from "./components/primary-button/primary-button.component";
import { ProductsListComponent } from "./pages/products-list/products-list.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, PrimaryButtonComponent, ProductsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-training';
}

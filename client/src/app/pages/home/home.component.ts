import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { SpotsComponent } from '../../components/spots/spots.component';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    HeroComponent,
    SpotsComponent,
    ProductGridComponent,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
  ]
})
export class HomeComponent {
  searchControl = new FormControl('');
}

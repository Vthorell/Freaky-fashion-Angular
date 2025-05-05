import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  standalone: true
})
export class HeroComponent {
  heroImageUrl = './assets/images/hero.jpg';
  heroTitle = 'Gratis frakt och returer';
  heroSubtitle = 'Expressfrakt | Säkra betalningar | Nyheter varje dag';
}

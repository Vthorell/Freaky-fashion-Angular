import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-spots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spots.component.html',
  styleUrls: ['./spots.component.css']
})
export class SpotsComponent {
  spots = [
    { imageUrl: '/assets/images/byxor.jpg', text: 'Kampanj 1' },
    { imageUrl: '/assets/images/byxor.jpg', text: 'Kampanj 2' },
    { imageUrl: '/assets/images/byxor.jpg', text: 'Kampanj 3' }
  ];
}
